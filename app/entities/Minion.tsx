import { View } from "react-native";
import React from "react";
import { Body } from "matter-js";

interface MinionProps {
  body: Body;
  size: [number, number];
}

// hierarchy is minion < mini < boss
const Minion = ({ body, size }: MinionProps) => {
  const x = body.position.x - size[0] / 2;
  const y = body.position.y - size[1] / 2;

  return (
    <View
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: 30,
        height: 30,
      }}
      className="bg-black border-2 border-amber-900 rounded-md"
    />
  );
};

export default Minion;
