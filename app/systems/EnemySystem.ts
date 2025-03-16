import { IWall, Minion } from "@/types/entityTypes";
import Matter from "matter-js";
import { AppDispatch } from "../redux/store";
import { removeHealth } from "../redux/slices/wallSlice";

let minionSpawnTimer = 0;
const MAX_DELTA = 990 / 60;
let collisionListenerAdded = false;
const processedCollisions = new Set();

export const EnemySystem = (
  entities: any,
  { time }: any,
  dispatch: AppDispatch
) => {
  minionSpawnTimer += Math.min(MAX_DELTA, time.delta);
  if (minionSpawnTimer >= 1500) handleMinionSpawning(entities);

  if (!collisionListenerAdded && entities.physics && entities.physics.engine) {
    Matter.Events.on(
      entities.physics.engine,
      "collisionStart",
      (event: Matter.IEvent<any>) => {
        onCollide(entities, event, dispatch);
      }
    );

    collisionListenerAdded = true;
  }
  return entities;
};

const handleMinionSpawning = (entities: any) => {
  const minion = Matter.Bodies.rectangle(
    Math.random() * entities.dimensions.width,
    0,
    40,
    40,
    {
      isSensor: false,
      frictionAir: 0.1,
      restitution: 0,
      label: "minion",
    }
  ) as Minion;

  minion.health = 3;
  minion.damage = 1;

  Matter.World.add(entities.physics.world, minion);

  const minionId = `minion_${new Date().getTime()}`;

  entities[minionId] = {
    body: minion,
    renderer: entities.minionRenderer,
  };

  minionSpawnTimer = 0;
};

const onCollide = (entities: any, event: any, dispatch: AppDispatch) => {
  const pairs = event.pairs;

  for (let i = 0; i < pairs.length; i++) {
    const { bodyA, bodyB } = pairs[i];

    // Create a unique collision ID
    const collisionId = `${bodyA.id}_${bodyB.id}`;

    // Skip if we've already processed this collision
    if (processedCollisions.has(collisionId)) continue;

    let minion, wall;

    if (bodyA.label === "minion" && bodyB.label === "wall") {
      minion = bodyA;
      wall = bodyB;
    } else if (bodyA.label === "wall" && bodyB.label === "minion") {
      wall = bodyA;
      minion = bodyB;
    } else {
      continue; // Not a minion-wall collision
    }

    const wallId = getWallId(wall, entities);
    const minionId = getMinionId(minion, entities);

    if (wallId && minionId) {
      // Mark as processed
      processedCollisions.add(collisionId);

      // Process the collision
      handleCollisionStart(minion, wall, entities, dispatch);

      // Clean up after a short delay
      setTimeout(() => {
        processedCollisions.delete(collisionId);
      }, 100);
    }
  }
};

//imagine the minion is ziggs or a kamikaze, he dies to damage the tower
const handleCollisionStart = (
  minion: Minion,
  wall: IWall,
  entities: any,
  dispatch: AppDispatch
) => {
  const wallId = getWallId(wall, entities);
  const minionId = getMinionId(minion, entities);

  if (!wallId || !minionId) return;

  // Damage the wall with minion's damage
  wall.health -= minion.damage;
  dispatch(removeHealth());

  // Check if wall should be destroyed
  if (wall.health <= 0) {
    Matter.World.remove(entities.physics.world, wall);
    delete entities[wallId];
  }

  // Kamikaze behavior - minion dies on collision
  Matter.World.remove(entities.physics.world, minion);
  delete entities[minionId];
};

// Helper function for other systems
export const getMinionId = (
  body: Minion,
  entities: any
): string | undefined => {
  return Object.keys(entities).find(
    (key) => key.startsWith("minion_") && entities[key].body === body
  );
};

const getWallId = (wall: IWall, entities: any): string | undefined => {
  return Object.keys(entities).find((key) => entities[key].body === wall);
};
