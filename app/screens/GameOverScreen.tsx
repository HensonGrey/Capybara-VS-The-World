import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { PawPrint, Play } from "lucide-react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useRouter } from "expo-router";
import { toggleGameState } from "../redux/slices/gameSlice";

const GameOverScreen = () => {
  const clock = useSelector((state: RootState) => state.clock);
  const dispatch = useDispatch();
  const router = useRouter();

  const onGameRestart = () => {
    dispatch(toggleGameState());
    router.push({
      pathname: "/screens/GameScreen",
    });
  };
  return (
    <SafeAreaView className="h-screen bg-gray-400 flex justify-between">
      {/* Top Section */}
      <View className="items-center mt-12 relative">
        <PawPrint
          size={120}
          color={"brown"}
          fill={"brown"}
          className="absolute top-0"
        />
        <Text className="text-4xl font-bold mt-24">OUCH. You died!</Text>
        <Text className="text-4xl font-bold mt-24">You survived: {clock}</Text>
      </View>

      {/* Centered Play Button */}
      <View className="flex-1 justify-center items-center">
        <TouchableOpacity onPress={onGameRestart}>
          <Play size={80} color={"gold"} fill={"black"} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default GameOverScreen;
