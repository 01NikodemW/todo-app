import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, router, useLocalSearchParams } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/useColorScheme";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/api/query-client";
import { Pressable, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { moderateScale } from "@/styles/metrics";
import { useDeleteTask } from "@/api/tasks/use-delete-task";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen
            name="index"
            options={{
              headerTitle: "",
              headerRight: () => (
                <Pressable
                  onPress={() => {
                    router.navigate("create-task");
                  }}
                >
                  <Ionicons name="add" size={moderateScale(30)} color="black" />
                </Pressable>
              ),
            }}
          />
          <Stack.Screen
            name="task/[id]"
            options={{
              headerTitle: "",
              headerBackTitle: "Back to tasks",
            }}
          />
          <Stack.Screen
            name="create-task/index"
            options={{
              presentation: "modal",
              headerTitle: "Crate new task",
              headerRight: () => (
                <Pressable
                  onPress={() => {
                    router.back();
                  }}
                >
                  <Ionicons
                    name="close"
                    size={moderateScale(30)}
                    color="black"
                  />
                </Pressable>
              ),
            }}
          />
          <Stack.Screen name="+not-found" />
        </Stack>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
