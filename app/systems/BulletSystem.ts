import { Bullet, Minion } from "@/types/entityTypes";
import Matter from "matter-js";
import { useDispatch } from "react-redux";
import { addCoins } from "../redux/slices/coinsSlice";
import { AppDispatch } from "../redux/store";

let bulletSpawnTimer = 0;
const MAX_DELTA = 990 / 60;
let collisionListenerAdded = false;
const processedCollisions = new Set();

export const BulletSystem = (
  entities: any,
  { time }: any,
  dispatch: AppDispatch
) => {
  handleShooting(entities, Math.min(time.delta, MAX_DELTA));

  // Only set up the collision listener once
  if (!collisionListenerAdded && entities.physics && entities.physics.engine) {
    Matter.Events.on(
      entities.physics.engine,
      "collisionStart",
      (event: Matter.IEvent<any>) => {
        onEnemyHit(entities, event, dispatch);
      }
    );

    collisionListenerAdded = true;
  }

  return entities;
};

const handleShooting = (entities: any, delta: number) => {
  bulletSpawnTimer += delta;

  if (bulletSpawnTimer < 400) return;

  const player = entities.player;
  const bullet = Matter.Bodies.rectangle(
    player.position.x,
    player.position.y - 50,
    15,
    25,
    { isSensor: true, frictionAir: 0, label: "bullet" }
  ) as Bullet;

  bullet.damage = 1;

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

const onEnemyHit = (entities: any, event: any, dispatch: AppDispatch) => {
  const pairs = event.pairs;

  for (let i = 0; i < pairs.length; i++) {
    const { bodyA, bodyB } = pairs[i];

    // Create a unique collision ID
    const collisionId = `${bodyA.id}_${bodyB.id}`;

    // Skip if we've already processed this collision
    if (processedCollisions.has(collisionId)) continue;

    let bullet, minion;

    if (bodyA.label === "minion" && bodyB.label === "bullet") {
      minion = bodyA;
      bullet = bodyB;
    } else if (bodyB.label === "minion" && bodyA.label === "bullet") {
      minion = bodyB;
      bullet = bodyA;
    } else {
      continue; // Not a minion-bullet collision
    }

    const bulletId = getBulletId(bullet, entities);
    const minionId = getMinionId(minion, entities);

    if (bulletId && minionId) {
      // Mark as processed
      processedCollisions.add(collisionId);

      // Process the collision
      handleCollision(minion, bullet, entities, dispatch);

      // Clean up after a short delay
      setTimeout(() => {
        processedCollisions.delete(collisionId);
      }, 100);
    }
  }
};

const handleCollision = (
  minion: Minion,
  bullet: Bullet,
  entities: any,
  dispatch: AppDispatch
) => {
  const bulletId = getBulletId(bullet, entities);
  const minionId = getMinionId(minion, entities);

  // Safety check - only proceed if both entities still exist
  if (!bulletId || !minionId) return;

  minion.health -= bullet.damage;

  if (minion.health <= 0) {
    Matter.World.remove(entities.physics.world, minion);
    delete entities[minionId];

    dispatch(addCoins(5));
  }

  Matter.World.remove(entities.physics.world, bullet);
  delete entities[bulletId];
};

const getBulletId = (body: Bullet, entities: any): string | undefined => {
  return Object.keys(entities).find(
    (key) => key.startsWith("bullet_") && entities[key].body === body
  );
};

const getMinionId = (body: Minion, entities: any): string | undefined => {
  return Object.keys(entities).find(
    (key) => key.startsWith("minion_") && entities[key].body === body
  );
};
