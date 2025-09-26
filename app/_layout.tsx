import { Stack } from "expo-router";
import { useEffect } from "react";
import { Platform, StatusBar } from "react-native";
import "./globals.css";

export default function RootLayout() {
  useEffect(() => {
    if (Platform.OS === "web") {
      import("expo-keep-awake").then((mod) => {
        try {
          mod.deactivateKeepAwake();
        } catch (e) {}
      });
    }
  }, []);
  return (
    <>
      <StatusBar hidden={true} />

      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="book/[id]"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </>
  );
}
