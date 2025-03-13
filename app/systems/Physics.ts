import Matter from "matter-js";

const Physics = (entities: any, { touches, time }: any) => {
  const engine = entities.physics.engine;

  Matter.Engine.update(engine, time.delta);
  return entities;
};

export default Physics;
