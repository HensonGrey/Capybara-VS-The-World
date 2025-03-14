import { View } from "react-native";
import React from "react";
import { Vector } from "matter-js";

interface PlayerProps {
  position: Vector;
}

const Player = ({ position }: PlayerProps) => {
  return (
    <View
      style={{
        position: "absolute",
        left: position ? position.x - 25 : 50,
        bottom: 20,
        width: 50,
        height: 50,
        backgroundColor: "red",
      }}
    />
  );
};

export default Player;
