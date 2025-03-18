import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { TouchableOpacity } from "react-native";
import { PawPrint, Play } from "lucide-react-native";
import { useRouter } from "expo-router";
import { toggleGameState } from "../redux/slices/gameSlice";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import AsyncStorage from "@react-native-async-storage/async-storage";
import auth from "@react-native-firebase/auth";
import { RootState } from "../redux/store";
import { formatTime } from "../components/Clock";

export default function StartScreen() {
  const dispatch = useDispatch();
  const router = useRouter();
  const record = useSelector((state: RootState) => state.record);

  const onGameStart = () => {
    dispatch(toggleGameState());
    router.push({
      pathname: "/screens/GameScreen",
    });
  };

  const signOut = async () => {
    try {
      await GoogleSignin.signOut();

      await auth().signOut();

      await AsyncStorage.removeItem("jwt");

      router.push("/");
    } catch (error) {
      console.error("Sign out error:", error);
    }
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
        <Text className="text-2xl font-bold">
          Best Time: {formatTime(record)}
        </Text>
      </View>

      {/* Centered Play Button */}
      <View className="flex-1 justify-center items-center">
        <TouchableOpacity onPress={onGameStart}>
          <Play size={80} color={"gold"} fill={"black"} />
        </TouchableOpacity>
      </View>

      <View className="mb-10">
        <TouchableOpacity onPress={signOut} className="h-16 w-32 bg-red-400">
          <Text className="text-center text-xl">Sign Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
