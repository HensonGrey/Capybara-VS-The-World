import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import GameHeader from "./components/GameHeader";
import GameFooter from "./components/GameFooter";

export default function Index() {
  return (
    <SafeAreaView className="h-screen flex" style={{ flex: 1 }}>
      <GameHeader className="bg-gray-400 border" />
      <View style={{ flex: 8 }} className="bg-black border"></View>
      <GameFooter className="bg-gray-400 border" />
    </SafeAreaView>
  );
}
