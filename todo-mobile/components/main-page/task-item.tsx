import React, { FC } from "react";
import { View, Text, Pressable } from "react-native";
import { Task } from "@/types/task";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "@/styles/metrics";
import { router } from "expo-router";

type TaskItemProps = {
  task: Task;
};

const TaskItem: FC<TaskItemProps> = ({ task }) => {
  return (
    <Pressable
      onPress={() => {
        router.navigate(`/task/${task.id}`);
      }}
    >
      <View
        style={{
          width: horizontalScale(300),
          height: verticalScale(60),
          backgroundColor: "white",
          marginTop: verticalScale(8),
          borderRadius: moderateScale(8),
          alignItems: "center",
          justifyContent: "center",
          borderColor: "#8d49e8",
          borderWidth: moderateScale(2),
        }}
      >
        <Text
          style={{
            color: "black",
            fontSize: moderateScale(16),
            fontWeight: "bold",
          }}
        >
          {task.title}
        </Text>
      </View>
    </Pressable>
  );
};

export default TaskItem;
