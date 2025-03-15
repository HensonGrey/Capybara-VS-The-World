import Matter from "matter-js";

const MAX_DELTA = 990 / 60; //60fps

const Physics = (entities: any, { time }: any) => {
  const engine = entities.physics.engine;

  Matter.Engine.update(engine, Math.min(MAX_DELTA, time.delta));
  return entities;
};

export default Physics;
