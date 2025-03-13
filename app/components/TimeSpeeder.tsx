import { Text, TouchableOpacity } from "react-native";
import React from "react";

export interface TimeSpeederProps {
  speed: number; //defaults to 1, can be changed to 2 or 4 i.e the speed of the game
}

// TODO -> this shit will be in settings

const TimeSpeeder = ({ speed }: TimeSpeederProps) => {
  return (
    <TouchableOpacity className="-ml-1 bg-slate-600 rounded-xl shadow-slate-800 p-5">
      <Text>{speed}</Text>
    </TouchableOpacity>
  );
};

export default TimeSpeeder;
