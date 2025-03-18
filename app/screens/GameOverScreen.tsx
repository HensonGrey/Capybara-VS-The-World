import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { PawPrint, Play } from "lucide-react-native";
import { useDispatch, useSelector } from "react-redux";
import { useLocalSearchParams, useRouter } from "expo-router";
import { toggleGameState } from "../redux/slices/gameSlice";
import { formatTime } from "../components/Clock";
import { RootState } from "../redux/store";
import { useEffect, useState } from "react";
import { setRecord } from "../redux/slices/timeSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

const GameOverScreen = () => {
  const { timeCopy } = useLocalSearchParams();
  const dispatch = useDispatch();
  const router = useRouter();
  const record = useSelector((state: RootState) => state.record);
  const [isLoading, setIsloading] = useState<boolean>(false);

  const onGameRestart = () => {
    dispatch(toggleGameState());
    router.push({
      pathname: "/screens/GameScreen",
    });
  };

  useEffect(() => {
    const updateBestTime = async () => {
      try {
        setIsloading(true);
        const jwt = await AsyncStorage.getItem("jwt");
        if (parseInt(timeCopy.toString()) > parseInt(record.toString())) {
          await fetch("http://10.0.2.2:5000/user/update-record", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwt}`,
            },
            body: JSON.stringify({ newBest: timeCopy }),
          });

          dispatch(setRecord(parseInt(timeCopy.toString())));
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsloading(false);
      }
    };
    updateBestTime();
  }, [dispatch, timeCopy]);

  if (isLoading)
    return (
      <View className="flex-1 justify-center items-center">
        <View className="w-16 h-16 border-4 border-t-blue-500 border-gray-200 rounded-full animate-spin" />
      </View>
    );
  return (
    <SafeAreaView className="h-screen bg-gray-400 flex justify-between">
      {/* Top Section */}
      <View className="items-center mt-12 relative">
        <PawPrint
          size={120}
          color={"brown"}
          fill={"brown"}
          className="absolute top-0"
          onPress={() => router.push("/screens/StartScreen")}
        />
        <Text className="text-4xl font-bold mt-24">OUCH. You died!</Text>
        <Text className="text-4xl font-bold mt-24">
          You survived: {formatTime(parseInt(timeCopy.toString()))}
        </Text>
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
