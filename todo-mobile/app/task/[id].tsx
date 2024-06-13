import { Formik } from "formik";
import { View, TextInput, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { moderateScale } from "@/styles/metrics";
import { TASK_STATUS_ARRAY } from "@/types/constants";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useTaskById } from "@/api/tasks/use-task-by-id";
import { useEffect, useLayoutEffect, useState } from "react";
import { useEditTask } from "@/api/tasks/use-edit-task";
import { EditTaskRequest } from "@/types/api/tasks/edit-task-request";
import { useDeleteTask } from "@/api/tasks/use-delete-task";

export default function Task() {
  const { id } = useLocalSearchParams();
  const { task, isTaskFetching } = useTaskById(Array.isArray(id) ? id[0] : id);
  const editTask = useEditTask(Array.isArray(id) ? id[0] : id);
  const deleteTask = useDeleteTask();
  const navigation = useNavigation();

  const [isEditing, setIsEditing] = useState(false);

  const [initialValues, setInitialValues] = useState<EditTaskRequest>({
    title: task?.title || "",
    description: task?.description || "",
    status: task?.status || "todo",
  });

  useEffect(() => {
    setInitialValues({
      title: task?.title || "",
      description: task?.description || "",
      status: task?.status || "todo",
    });
  }, [task, isTaskFetching]);

  const generateIcon = (status: string) => {
    switch (status) {
      case "todo":
        return "create-outline";
      case "in-progress":
        return "time-outline";
      case "done":
        return "checkmark-done";
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          onPress={() => {
            deleteTask(Array.isArray(id) ? id[0] : id);
          }}
        >
          <Ionicons
            name="trash-bin-outline"
            size={moderateScale(24)}
            color="black"
          />
        </Pressable>
      ),
    });
  }, [navigation]);

  return (
    <View style={{ flex: 1 }}>
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        onSubmit={(values) => {
          editTask(values);
          setIsEditing(false);
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View>
            <TextInput
              style={{ height: 40, margin: 12, borderWidth: 1, padding: 10 }}
              onChangeText={handleChange("title")}
              onBlur={handleBlur("title")}
              placeholder="title"
              value={values.title}
              editable={isEditing}
            />
            <TextInput
              style={{ height: 200, margin: 12, borderWidth: 1, padding: 10 }}
              onChangeText={handleChange("description")}
              onBlur={handleBlur("description")}
              placeholder="description"
              value={values.description}
              multiline={true}
              numberOfLines={4}
              editable={isEditing}
            />
            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  margin: 12,
                }}
              >
                {TASK_STATUS_ARRAY.map((status) => (
                  <Pressable
                    key={status}
                    onPress={() => {
                      if (isEditing) {
                        handleChange("status")(status);
                      }
                    }}
                    style={
                      values.status === status
                        ? styles.statusPressableChecked
                        : styles.statusPressable
                    }
                  >
                    <Ionicons
                      name={generateIcon(status)}
                      size={moderateScale(30)}
                      color="black"
                    />
                    <Text>{status}</Text>
                  </Pressable>
                ))}
              </View>
            </View>

            <Pressable
              onPress={() => {
                if (isEditing) {
                  handleSubmit();
                } else {
                  setIsEditing(true);
                }
              }}
              style={{
                backgroundColor: "#8d49e8",
                padding: 10,
                margin: 12,
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>
                {isEditing ? "Save Changes" : "Edit"}
              </Text>
            </Pressable>
            {isEditing && (
              <Pressable
                onPress={() => {
                  setIsEditing(false);
                  handleChange("title")(task?.title || "");
                  handleChange("description")(task?.description || "");
                  handleChange("status")(task?.status || "todo");
                }}
                style={{
                  borderColor: "#8d49e8",
                  borderWidth: 2,
                  padding: 10,
                  margin: 12,
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "#8d49e8", fontWeight: "bold" }}>
                  {"Cancel"}
                </Text>
              </Pressable>
            )}
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  statusPressable: {
    alignItems: "center",
    borderColor: "transparent",
    borderWidth: 2,
    width: "30%",
    padding: moderateScale(10),
    borderRadius: moderateScale(10),
  },
  statusPressableChecked: {
    alignItems: "center",
    borderColor: "#8d49e8",
    borderWidth: 2,
    width: "30%",
    padding: moderateScale(10),
    borderRadius: moderateScale(10),
  },
});
