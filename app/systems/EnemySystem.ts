import { Minion } from "@/types/entityTypes";
import Matter from "matter-js";

let minionSpawnTimer = 0;
const MAX_DELTA = 990 / 60;

export const EnemySystem = (entities: any, { time }: any) => {
  minionSpawnTimer += Math.min(MAX_DELTA, time.delta);
  if (minionSpawnTimer >= 1000) handleMinionSpawning(entities);

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

// Helper function for other systems
export const getMinionId = (
  body: Minion,
  entities: any
): string | undefined => {
  return Object.keys(entities).find(
    (key) => key.startsWith("minion_") && entities[key].body === body
  );
};
