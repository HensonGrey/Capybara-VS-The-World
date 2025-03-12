import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";

interface ClockProps {
  onStart?: () => void;
  onEnd?: () => void;
}

const Clock = ({ onStart, onEnd }: ClockProps) => {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (running) {
      if (seconds === 0 && onStart) onStart();
      const interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (seconds > 0 && onEnd) {
      onEnd();
    }
  }, [running]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <View className="items-center">
      <Text className="text-2xl font-bold text-white">
        {formatTime(seconds)}
      </Text>
    </View>
  );
};

export default Clock;
