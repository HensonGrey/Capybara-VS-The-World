import { View } from "react-native";
import React from "react";
import { Body } from "matter-js";

interface BulletProps {
  body: Body;
}

const Bullet = ({ body }: BulletProps) => {
  const x = body.position.x;
  const y = body.position.y;

  return (
    <View
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: 25,
        height: 15,
      }}
      className="bg-blue-300 border-2 border-yellow-400 rounded-md"
    />
  );
};

export default Bullet;
