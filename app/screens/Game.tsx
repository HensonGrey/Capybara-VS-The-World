import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import Matter from "matter-js";
import { GameEngine } from "react-native-game-engine";
import Player from "../entities/Player";
import Physics from "../systems/Physics";
import Wall from "../entities/Wall";
import Minion from "../entities/Minion";
import Bullet from "../entities/Bullet";

const Game = () => {
  // State for dimensions and entities
  const [dimensions, setDimensions] = useState<{
    width: number;
    height: number;
  }>({
    height: 0,
    width: 0,
  });

  const [entities, setEntities] = useState<any>(null);

  // Get dimensions when component mounts
  const onLayout = (event: any) => {
    const { width, height } = event.nativeEvent.layout;
    setDimensions({ width, height });
  };

  // Set up the world when dimensions are available
  useEffect(() => {
    if (dimensions.width > 0 && dimensions.height > 0) {
      setEntities(setupWorld());
    }
  }, [dimensions.width, dimensions.height]);

  const setupWorld = () => {
    const engine = Matter.Engine.create({ enableSleeping: false });
    const world = engine.world;

    // Create player
    const player = Matter.Bodies.rectangle(
      dimensions.width / 2,
      dimensions.height - 50,
      50,
      50
    );

    const wall = Matter.Bodies.rectangle(
      dimensions.width / 2, // center horizontally
      dimensions.height - 225,
      dimensions.width,
      50,
      { isStatic: true } // static wall (non-moving)
    );

    Matter.World.add(world, [player, wall]);

    return {
      physics: { engine, world },
      dimensions: { width: dimensions.width, height: dimensions.height },
      player: {
        body: player,
        size: [50, 50],
        color: "red",
        position: player.position,
        rotation: player.angle,
        renderer: Player,
      },
      wall: {
        body: wall,
        size: [dimensions.width, 50],
        color: "brown",
        position: wall.position,
        rotation: wall.angle,
        renderer: Wall,
      },
      minionRenderer: Minion,
      bulletRenderer: Bullet,
    };
  };

  return (
    <View style={{ flex: 8 }} onLayout={onLayout}>
      {dimensions.width > 0 && entities ? (
        <GameEngine systems={[Physics]} entities={entities} />
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

export default Game;
