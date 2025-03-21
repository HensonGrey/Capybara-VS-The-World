import { View, Text } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import Matter from "matter-js";
import { GameEngine } from "react-native-game-engine";
import Player from "../entities/Player";
import Physics from "../systems/Physics";
import Wall from "../entities/Wall";
import Minion from "../entities/Minion";
import Bullet from "../entities/Bullet";
import PlayerSystem from "../systems/PlayerSystem";
import BulletSystem, { cleanupBulletSystem } from "../systems/BulletSystem";
import EnemySystem, { cleanupEnemySystem } from "../systems/EnemySystem";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useRouter } from "expo-router";
import { resetGame } from "../redux/slices/temporaryUpgradesSlice";
import { resetCoins } from "../redux/slices/coinsSlice";
import { resetTime } from "../redux/slices/clockSlice";

const Game = () => {
  const dispatch = useDispatch();
  const gameState = useSelector((state: RootState) => state.game);
  const seconds = useSelector((state: RootState) => state.clock);
  const gameEngineRef = useRef(null);
  const router = useRouter();

  const [dimensions, setDimensions] = useState<{
    width: number;
    height: number;
  }>({
    height: 0,
    width: 0,
  });

  const [entities, setEntities] = useState<any>(null);

  const onLayout = (event: any) => {
    const { width, height } = event.nativeEvent.layout;
    setDimensions({ width, height });
  };

  useEffect(() => {
    if (dimensions.width > 0 && dimensions.height > 0) {
      setEntities(setupWorld());
    }
  }, [dimensions.width, dimensions.height]);

  useEffect(() => {
    if (gameState === false) {
      let timeCopy = seconds;
      dispatch(resetGame());
      dispatch(resetCoins());
      dispatch(resetTime());
      clearWorld();
      router.navigate({
        pathname: "/screens/GameOverScreen",
        params: { timeCopy },
      });
    }
  }, [gameState]);

  const setupWorld = () => {
    const engine = Matter.Engine.create({ enableSleeping: false });
    const world = engine.world;

    const player = Matter.Bodies.rectangle(
      dimensions.width / 2,
      dimensions.height - 50,
      50,
      50
    );

    const wall = Matter.Bodies.rectangle(
      dimensions.width / 2,
      player.position.y - 100,
      dimensions.width,
      50,
      { isStatic: true, label: "wall" }
    );

    Matter.World.add(world, [player, wall]);

    return {
      physics: { engine, world },
      dimensions: { width: dimensions.width, height: dimensions.height },
      player: {
        body: player,
        position: player.position,
        renderer: Player,
      },
      wall: {
        body: wall,
        position: wall.position,
        renderer: Wall,
      },
      minionRenderer: Minion,
      bulletRenderer: Bullet,
    };
  };

  const clearWorld = () => {
    if (entities?.physics) {
      Matter.Engine.clear(entities.physics.engine);
      Matter.World.clear(entities.physics.world, false);
      setEntities(null);

      cleanupEnemySystem();
      cleanupBulletSystem();
    }
  };

  return (
    <View style={{ flex: 8 }} onLayout={onLayout}>
      {dimensions.width > 0 && entities ? (
        <GameEngine
          ref={gameEngineRef}
          systems={[
            Physics,
            PlayerSystem,
            (entities: any, { time }: any) =>
              BulletSystem(entities, { time }, dispatch),
            (entities: any, { time }: any) =>
              EnemySystem(entities, { time }, dispatch),
          ]}
          entities={entities}
          running={gameState}
        />
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

export default Game;
