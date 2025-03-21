import { Minion } from "@/types/entityTypes";
import Matter, { Body } from "matter-js";
import { AppDispatch } from "../redux/store";
import { lowerWallHealth } from "../redux/slices/temporaryUpgradesSlice";
import store from "../redux/store";
import { toggleGameState } from "../redux/slices/gameSlice";

let minionSpawnTimer = 0;
const MAX_DELTA = 990 / 60;
let processedCollisions = new Set();
let collisionListener: {
  engine: Matter.Engine;
  callback: (event: Matter.IEvent<any>) => void;
} | null = null;

const EnemySystem = (entities: any, { time }: any, dispatch: AppDispatch) => {
  minionSpawnTimer += Math.min(MAX_DELTA, time.delta);
  if (minionSpawnTimer >= 1500) handleMinionSpawning(entities);

  //stored together for proper cleanup on game restart
  if (entities.physics && entities.physics.engine && !collisionListener) {
    const callback = (event: Matter.IEvent<any>) => {
      onCollide(entities, event, dispatch);
    };
    Matter.Events.on(entities.physics.engine, "collisionStart", callback);
    collisionListener = { engine: entities.physics.engine, callback };
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
  wall: Body,
  entities: any,
  dispatch: AppDispatch
) => {
  const wallId = getWallId(wall, entities);
  const minionId = getMinionId(minion, entities);
  const currentWallHealth =
    store.getState().temporaryUpgrades.currentWallHealth;

  if (!wallId || !minionId) return;

  dispatch(lowerWallHealth(minion.damage));

  if (currentWallHealth <= 1) {
    Matter.World.remove(entities.physics.world, wall);
    delete entities[wallId];
    dispatch(toggleGameState());
  }

  Matter.World.remove(entities.physics.world, minion);
  delete entities[minionId];
};

export const getMinionId = (
  body: Minion,
  entities: any
): string | undefined => {
  return Object.keys(entities).find(
    (key) => key.startsWith("minion_") && entities[key].body === body
  );
};

const getWallId = (wall: Body, entities: any): string | undefined => {
  return Object.keys(entities).find((key) => entities[key].body === wall);
};

// Cleanup function to reset state and remove event listeners
export const cleanupEnemySystem = () => {
  if (collisionListener) {
    Matter.Events.off(
      collisionListener.engine,
      "collisionStart",
      collisionListener.callback
    );
    collisionListener = null;
  }
  minionSpawnTimer = 0;
  processedCollisions.clear();
};

export default EnemySystem;
