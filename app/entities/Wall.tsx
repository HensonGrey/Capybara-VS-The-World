import { View } from "react-native";
import React from "react";

const Wall = () => {
  return (
    <View
      style={{
        position: "absolute",
        left: 0,
        bottom: 100,
        backgroundColor: "brown",
      }}
      className="rounded-lg w-full h-12"
    />
  );
};

export default Wall;
