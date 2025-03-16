import { Text, TouchableOpacity } from "react-native";
import { LucideIcon } from "lucide-react-native";
import React from "react";

interface UpgradeButtonProps {
  Icon: LucideIcon;
  price: string | number;
  hasEnoughCoins: boolean;
  onPress: () => void;
}

const UpgradeButton = ({
  Icon,
  price,
  hasEnoughCoins,
  onPress,
}: UpgradeButtonProps) => {
  const disabled = typeof price === "string" || !hasEnoughCoins;
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`flex items-center justify-center flex-1 border rounded-lg ${
        disabled ? "bg-gray-500" : ""
      }`}
      disabled={disabled}
    >
      <Icon size={48} color={"purple"} fill={"gold"} />
      <Text className="text-2xl">{price}</Text>
    </TouchableOpacity>
  );
};

export default UpgradeButton;
