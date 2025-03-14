import { View } from "react-native";
import React from "react";
import { Body } from "matter-js";

interface WallProps {
  body: Body;
  size: [number, number];
}

const Wall = ({ body, size }: WallProps) => {
  const width = size[0];
  const height = size[1];

  const x = body.position.x - width / 2;
  const y = body.position.y;

  return (
    <View
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: width,
        height: height,
        backgroundColor: "brown",
      }}
      className="rounded-lg"
    />
  );
};

export default Wall;
