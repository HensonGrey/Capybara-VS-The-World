import Matter from "matter-js";
import { handleMinions, handlePlayerTouch } from "../utils/PhysicsUtils";

const Physics = (entities: any, { touches, time }: any) => {
  const engine = entities.physics.engine;
  Matter.Engine.update(engine, time.delta);

  handleMinions(entities, time.delta);

  if (touches.length > 0) {
    const touch = touches[touches.length - 1];
    if (touch.type === "move" || touch.type === "start") {
      handlePlayerTouch(entities, touch);
    }
  }

  return entities;
};

export default Physics;
