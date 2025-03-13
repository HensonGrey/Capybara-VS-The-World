import { View } from "react-native";
import React from "react";

interface WallProps {
  body: any; // Assuming you're passing the body of the Matter.js object
  size: [number, number];
}

const Wall = ({ body, size }: WallProps) => {
  const width = size[0];
  const height = size[1];

  const x = body.position.x - width / 2; // Adjust for centering
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
