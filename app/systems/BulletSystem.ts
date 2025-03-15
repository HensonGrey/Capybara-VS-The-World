import Matter from "matter-js";

let bulletSpawnTimer = 0;
const MAX_DELTA = 990 / 60;

export const BulletSystem = (entities: any, { time }: any) => {
  handleShooting(entities, Math.max(time.delta, MAX_DELTA));
  return entities;
};

const handleShooting = (entities: any, delta: number) => {
  bulletSpawnTimer += delta;

  if (bulletSpawnTimer < 250) return;

  const player = entities.player;
  const bullet = Matter.Bodies.rectangle(
    player.position.x,
    player.position.y - 50,
    15,
    25,
    { isSensor: true, frictionAir: 0 }
  );

  Matter.World.add(entities.physics.world, bullet);
  Matter.Body.applyForce(bullet, bullet.position, { x: 0, y: -0.05 });

  const bulletId = `bullet_${new Date().getTime()}`;
  entities[bulletId] = {
    body: bullet,
    renderer: entities.bulletRenderer,
  };
  deleteOutOfBoundsBullets(entities);
  bulletSpawnTimer = 0;
};

const deleteOutOfBoundsBullets = (entities: any) => {
  Object.keys(entities)
    .filter((obj) => obj.startsWith("bullet_"))
    .forEach((id) => {
      const bullet = entities[id];
      if (bullet.body.position.y < 0) {
        Matter.World.remove(entities.physics.world, bullet.body);
        delete entities[id];
      }
    });
};
