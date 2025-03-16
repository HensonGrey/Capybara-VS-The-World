import { View } from "react-native";
import React from "react";
import { Body } from "matter-js";

interface MinionProps {
  body: Body;
}

const Minion = ({ body }: MinionProps) => {
  const x = body.position.x;
  const y = body.position.y;

  return (
    <View
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: 40,
        height: 40,
      }}
      className="bg-black border-2 border-amber-900"
    />
  );
};

export default Minion;
