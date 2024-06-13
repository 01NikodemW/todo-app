import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useTaskById } from "@/api/tasks/use-task-by-id";

export default function Task() {
  const { id } = useLocalSearchParams();

  const { task, isTaskFetching } = useTaskById(Array.isArray(id) ? id[0] : id);

  console.log("task ", task);

  return (
    <View>
      <Text>{"Title"}</Text>
      <Text>{task?.title}</Text>
      <Text>{"Description"}</Text>
      <Text>{task?.description}</Text>
      <Text>{"Status"}</Text>
      <Text>{task?.status}</Text>
    </View>
  );
}
