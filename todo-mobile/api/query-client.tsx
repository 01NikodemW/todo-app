import { QueryClient } from "@tanstack/react-query";
import Toast from "react-native-toast-message";

export function queryErrorHandler(error: any): void {
  Toast.show({
    type: "error",
    text1: "Error",
    text2: error.response.data.message[0],
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
