import { View } from "react-native";
import React, { useState } from "react";
import UpgradeButton from "./UpgradeButton";
import { Heart, Plus, Swords } from "lucide-react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { removeCoins } from "../redux/slices/coinsSlice";
import { increaseWallHealth } from "../redux/slices/temporaryUpgradesSlice";

interface GameFooterProps {
  className: string;
}

interface Price {
  index: number;
  price: number[];
}

const GameFooter = ({ className }: GameFooterProps) => {
  const [arrayPrices, setArrayPrices] = useState<Price[]>([
    { index: 0, price: [25, 50, 50] },
    { index: 0, price: [25, 50, 50] },
    { index: 0, price: [10, 50, 50] },
  ]);

  const dispatch = useDispatch();
  const coins = useSelector((state: RootState) => state.coins);

  const getPrice = (arrayIndex: number): string | number => {
    return arrayPrices[arrayIndex].index <= 2
      ? arrayPrices[arrayIndex].price[arrayPrices[arrayIndex].index]
      : "MAX";
  };

  const canUpgrade = (arrayIndex: number): boolean => {
    const index = arrayPrices[arrayIndex].index;
    const price = arrayPrices[arrayIndex].price[index];
    return price <= coins && index <= 2;
  };

  const addNewPlayer = () => {};
  const increaseDamage = () => {};
  const increaseWallDurability = () => {
    //price will be checked in the component itself,
    //in case of not enough coins, user wont even be able to click the button
    const price = arrayPrices[2].index;
    dispatch(removeCoins(price));
    dispatch(increaseWallHealth());
    setArrayPrices((prevArrayPrices) => {
      const updatedArray = [...prevArrayPrices];
      updatedArray[2].index = updatedArray[2].index + 1;
      return updatedArray;
    });
  };

  return (
    <View className={`${className} flex-row`} style={{ flex: 1 }}>
      <UpgradeButton
        Icon={Plus}
        price={getPrice(0)}
        hasEnoughCoins={canUpgrade(0)}
        onPress={addNewPlayer}
      />
      <UpgradeButton
        Icon={Swords}
        price={getPrice(1)}
        hasEnoughCoins={canUpgrade(1)}
        onPress={increaseDamage}
      />
      <UpgradeButton
        Icon={Heart}
        price={getPrice(2)}
        hasEnoughCoins={canUpgrade(2)}
        onPress={increaseWallDurability}
      />
    </View>
  );
};

export default GameFooter;
