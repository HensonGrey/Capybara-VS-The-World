import { SafeAreaView } from "react-native";
import GameFooter from "../components/GameFooter";
import GameHeader from "../components/GameHeader";
import Game from "../components/Game";

const GameScreen = () => {
  return (
    <SafeAreaView className="h-screen flex" style={{ flex: 1 }}>
      <GameHeader className="bg-gray-400 border" />
      <Game />
      <GameFooter className="bg-gray-300" />
    </SafeAreaView>
  );
};

export default GameScreen;
