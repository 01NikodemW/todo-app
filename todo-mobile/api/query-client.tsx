import { QueryClient } from "@tanstack/react-query";
import Toast from "react-native-toast-message";

export function queryErrorHandler(error: any): void {
  const errorMessage = error.message.join(", ");

  Toast.show({
    type: "custom",
    text1: "Error",
    text2: errorMessage,
    position: "top",
    visibilityTime: 6000,
  });
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 3600000,
      refetchOnWindowFocus: false,
    },
  },
});
