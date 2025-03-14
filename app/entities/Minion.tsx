import { View } from "react-native";
import React from "react";
import { Body } from "matter-js";

interface MinionProps {
  body: Body;
}

// hierarchy is minion < mini < boss
const Minion = ({ body }: MinionProps) => {
  const x = body.position.x - 15;
  const y = body.position.y - 15;

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
