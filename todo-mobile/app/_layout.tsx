import React, { useEffect } from "react";
import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, router } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useColorScheme } from "@/hooks/useColorScheme";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/api/query-client";
import { moderateScale, verticalScale } from "@/styles/metrics";
import { RootSiblingParent } from "react-native-root-siblings";
import Toast from "react-native-toast-message";
import CustomToast from "@/components/custom-toast";

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
      <RootSiblingParent>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
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
                    <Ionicons
                      name="add"
                      size={verticalScale(30)}
                      color="black"
                    />
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
                headerTitle: "",
                headerBackTitle: "Back to tasks",
              }}
            />
            <Stack.Screen name="+not-found" />
          </Stack>
        </ThemeProvider>
        {/* <Toast /> */}
        <Toast config={{ custom: (props) => <CustomToast {...props} /> }} />
      </RootSiblingParent>
    </QueryClientProvider>
  );
}
