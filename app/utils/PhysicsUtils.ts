import Matter from "matter-js";

export const handlePlayerTouch = (entities: any, touch: any) => {
  const player = entities.player;
  const touchX = touch.event.pageX;

  const minX = 25;
  const maxX = entities.dimensions.width - 25;
  const targetX = Math.max(minX, Math.min(maxX, touchX));
  Matter.Body.setPosition(player.body, {
    x: targetX,
    y: player.position.y,
  });

  // Zero out velocity to prevent momentum after finger movement stops
  Matter.Body.setVelocity(player.body, { x: 0, y: 0 });
};

export const handleMinions = (entities: any, delta: number) => {
  if (!entities.physics.minionSpawnTimer) entities.physics.minionSpawnTimer = 0;
  entities.physics.minionSpawnTimer += delta;

  const minWidth = 25;
  const maxWidth = entities.dimensions.width - 25;

  if (entities.physics.minionSpawnTimer > 1250) {
    const spawnX = Math.random() * (maxWidth - minWidth) + minWidth;
    const spawnY = -25;

    const minion = Matter.Bodies.rectangle(spawnX, spawnY, 25, 25, {
      frictionAir: 0.25,
      restitution: 0.1,
    });

    Matter.World.add(entities.physics.engine.world, minion);

    const minionId = `minion_${new Date().getTime()}`;
    entities[minionId] = {
      body: minion,
      size: [25, 25],
      renderer: entities.minionRenderer,
    };

    entities.physics.minionSpawnTimer = 0;
  }
};
