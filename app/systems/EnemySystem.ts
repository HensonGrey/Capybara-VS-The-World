import { IWall, Minion } from "@/types/entityTypes";
import Matter from "matter-js";
import { AppDispatch } from "../redux/store";
import { lowerWallHealth } from "../redux/slices/temporaryUpgradesSlice";
import store from "../redux/store";

let minionSpawnTimer = 0;
const MAX_DELTA = 990 / 60;
let collisionListenerAdded = false;
const processedCollisions = new Set();

const EnemySystem = (entities: any, { time }: any, dispatch: AppDispatch) => {
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

    const collisionId = `${bodyA.id}_${bodyB.id}`;

    if (processedCollisions.has(collisionId)) continue;

    let minion, wall;

    if (bodyA.label === "minion" && bodyB.label === "wall") {
      minion = bodyA;
      wall = bodyB;
    } else if (bodyA.label === "wall" && bodyB.label === "minion") {
      wall = bodyA;
      minion = bodyB;
    } else {
      continue;
    }

    const wallId = getWallId(wall, entities);
    const minionId = getMinionId(minion, entities);

    if (wallId && minionId) {
      processedCollisions.add(collisionId);

      handleCollisionStart(minion, wall, entities, dispatch);

      setTimeout(() => {
        processedCollisions.delete(collisionId);
      }, 100);
    }
  }
};

const handleCollisionStart = (
  minion: Minion,
  wall: IWall,
  entities: any,
  dispatch: AppDispatch
) => {
  const wallId = getWallId(wall, entities);
  const minionId = getMinionId(minion, entities);
  const currentWallHealth =
    store.getState().temporaryUpgrades.currentWallHealth;

  if (!wallId || !minionId) return;

  // Damage the wall with minion's damage
  // wall.health -= minion.damage;
  dispatch(lowerWallHealth(minion.damage));

  // Check if wall should be destroyed
  if (currentWallHealth <= 1) {
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

export default EnemySystem;
