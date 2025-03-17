import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View } from "react-native";
import { useDispatch } from "react-redux";
import { TouchableOpacity } from "react-native";
import { PawPrint, Play } from "lucide-react-native";
import { useRouter } from "expo-router";
import { toggleGameState } from "./redux/slices/gameSlice";

export default function Index() {
  const dispatch = useDispatch();
  const router = useRouter();

  const onGameStart = () => {
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
        <Text className="text-4xl font-bold mt-24">Game Name</Text>
      </View>

      {/* Centered Play Button */}
      <View className="flex-1 justify-center items-center">
        <TouchableOpacity onPress={onGameStart}>
          <Play size={80} color={"gold"} fill={"black"} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
