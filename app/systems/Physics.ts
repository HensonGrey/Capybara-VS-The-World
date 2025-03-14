import Matter from "matter-js";
import {
  handleMinions,
  handlePlayerTouch,
  handleShooting,
} from "../utils/PhysicsUtils";

const MAX_DELTA = 900 / 60; //60fps

const Physics = (entities: any, { touches, time }: any) => {
  const engine = entities.physics.engine;
  Matter.Engine.update(engine, Math.min(MAX_DELTA, time.delta));

  handleMinions(entities, Math.min(MAX_DELTA, time.delta));
  handleShooting(entities, Math.min(MAX_DELTA, time.delta));

  if (touches.length > 0) {
    const touch = touches[touches.length - 1];
    if (touch.type === "move" || touch.type === "start") {
      handlePlayerTouch(entities, touch);
    }
  }

  return entities;
};

export default Physics;
