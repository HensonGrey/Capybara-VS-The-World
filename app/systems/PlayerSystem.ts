import Matter from "matter-js";

export const PlayerSystem = (entities: any, { touches }: any) => {
  Matter.Body.setVelocity(entities.player.body, { x: 0, y: 0 });

  if (touches.length > 0) {
    const touch = touches[touches.length - 1];
    if (touch.type === "move" || touch.type === "start") {
      handlePlayerMovement(entities, touch);
    }
  }

  return entities;
};

const handlePlayerMovement = (entities: any, touch: any) => {
  const player = entities.player;
  const touchX = touch.event.pageX;

  const minX = 25;
  const maxX = entities.dimensions.width - 25;
  const targetX = Math.max(minX, Math.min(maxX, touchX));

  // Update both the physics body AND the rendered position immediately
  Matter.Body.setPosition(player.body, {
    x: targetX,
    y: player.body.position.y,
  });

  // Zero out velocity
  Matter.Body.setVelocity(player.body, { x: 0, y: 0 });
};
