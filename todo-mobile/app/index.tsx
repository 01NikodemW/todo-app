import { View } from "react-native";
import { useTasks } from "@/api/tasks/use-tasks";
import TaskItem from "@/components/main-page/task-item";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function HomeScreen() {
  const { tasks } = useTasks();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
        }}
      >
        {tasks.map((task) => {
          return <TaskItem key={task.id} task={task} />;
        })}
      </View>
    </GestureHandlerRootView>
  );
}
