import { useMarkTaskAsComplete } from "@/api/tasks/use-mark-task-as-complete";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "@/styles/metrics";
import { Task } from "@/types/task";
import { router } from "expo-router";
import React, { FC } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import {
  PanGestureHandler,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring,
  runOnJS,
} from "react-native-reanimated";

type TaskItemProps = {
  task: Task;
};

const TaskItem: FC<TaskItemProps> = ({ task }) => {
  const translateX = useSharedValue(0);
  const MAX_TRANSLATE_X = -80;
  const markTaskAsComplete = useMarkTaskAsComplete();

  const onGestureEvent = useAnimatedGestureHandler({
    onActive: (event) => {
      if (Math.abs(event.translationX) > Math.abs(event.translationY)) {
        translateX.value = Math.max(
          MAX_TRANSLATE_X,
          Math.min(0, event.translationX)
        );
      }
    },
    onEnd: (event) => {
      if (translateX.value < MAX_TRANSLATE_X / 2) {
        runOnJS(markTaskAsComplete)(task.id);
      }
      translateX.value = withSpring(0); // Reset position on end
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const handlePress = () => {
    router.navigate(`/task/${task.id}`);
  };

  return (
    <GestureHandlerRootView>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={[animatedStyle, { marginBottom: 24 }]}>
          <Pressable onPress={handlePress}>
            <View style={styles.itemContainer}>
              <Text style={styles.title}>{task.title}</Text>
            </View>
          </Pressable>
        </Animated.View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    width: horizontalScale(300),
    height: verticalScale(60),
    backgroundColor: "white",
    borderRadius: moderateScale(8),
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#8d49e8",
    borderWidth: moderateScale(2),
  },
  title: {
    color: "black",
    fontSize: moderateScale(16),
    fontWeight: "bold",
  },
});

export default TaskItem;
