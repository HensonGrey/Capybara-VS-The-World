import { SafeAreaView } from "react-native-safe-area-context";
import GameHeader from "./components/GameHeader";
import GameFooter from "./components/GameFooter";
import Game from "./screens/Game";
import { store } from "./redux/store";
import { Provider } from "react-redux";

export default function Index() {
  return (
    <Provider store={store}>
      <SafeAreaView className="h-screen flex" style={{ flex: 1 }}>
        <GameHeader className="bg-gray-400 border" />
        <Game />
        <GameFooter className="bg-gray-300" />
      </SafeAreaView>
    </Provider>
  );
}
