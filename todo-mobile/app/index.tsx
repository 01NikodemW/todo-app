import React from "react";
import { View, Text, Pressable, StyleSheet, FlatList } from "react-native";
import { useTasks } from "@/api/tasks/use-tasks";
import TaskItem from "@/components/main-page/task-item";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { router } from "expo-router";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "@/styles/metrics";
import { Task } from "@/types/task";

export default function HomeScreen() {
  const { tasks } = useTasks();



  const renderItem = ({ item }: { item: Task }) => {
    return <TaskItem key={item.id} task={item} />;
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1, alignItems: "center" }}>
        {tasks.length === 0 ? (
          <Pressable
            onPress={() => {
              router.navigate("/create-task");
            }}
          >
            <View style={styles.itemContainer}>
              <Text style={styles.title}>{"Create new task"}</Text>
            </View>
          </Pressable>
        ) : (
          <FlatList
            data={tasks}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    width: horizontalScale(300),
    height: verticalScale(60),
    backgroundColor: "white",
    marginTop: verticalScale(8),
    borderRadius: moderateScale(8),
    alignItems: "center",
    justifyContent: "center",
    borderWidth: moderateScale(2),
  },
  title: {
    color: "black",
    fontSize: moderateScale(16),
    fontWeight: "bold",
  },
  listContent: {
    padding: moderateScale(16),
    paddingBottom: verticalScale(100), // Add some padding to the bottom to ensure scrolling past the last item
  },
});
