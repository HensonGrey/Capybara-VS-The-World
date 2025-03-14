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

  if (entities.physics.minionSpawnTimer > 750) {
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
      renderer: entities.minionRenderer,
    };

    entities.physics.minionSpawnTimer = 0;
  }
};

export const handleShooting = (entities: any, delta: number) => {
  if (!entities.physics.bulletShootTimer) entities.physics.bulletShootTimer = 0;
  entities.physics.bulletShootTimer += delta;

  updateBullets(entities);

  if (entities.physics.bulletShootTimer > 200) {
    const player = entities.player.body;

    const bullet = Matter.Bodies.rectangle(
      player.position.x,
      player.position.y - 40,
      25,
      15,
      { isSensor: true, frictionAir: 0 }
    );

    (bullet as any).shouldRemove = () => bullet.position.y < -50;

    Matter.Body.setVelocity(bullet, { x: 0, y: -10 });
    Matter.World.add(entities.physics.engine.world, bullet);

    const bulletId = `bullet_${new Date().getTime()}`;
    entities[bulletId] = {
      body: bullet,
      renderer: entities.bulletRenderer,
    };
    console.log(
      "Bullet count:",
      Object.keys(entities).filter((key) => key.startsWith("bullet_")).length
    );
    entities.physics.bulletShootTimer = 0;
  }
};

const updateBullets = (entities: any) => {
  Object.keys(entities)
    .filter((key) => key.startsWith("bullet_"))
    .forEach((key) => {
      const bullet = entities[key].body;
      if ((bullet as any).shouldRemove()) {
        Matter.World.remove(entities.physics.engine.world, bullet);
        delete entities[key];
        console.log("deleted bullet");
      } else {
        //keeping velocity up because cant disable gravity
        Matter.Body.setVelocity(bullet, { x: 0, y: -10 });
      }
    });
};
