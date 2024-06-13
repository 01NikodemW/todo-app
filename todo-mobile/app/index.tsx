import { StyleSheet, View } from "react-native";
import { useTasks } from "@/api/tasks/use-tasks";
import TaskItem from "@/components/main-page/task-item";

export default function HomeScreen() {
  const { tasks } = useTasks();

  return (
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
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
