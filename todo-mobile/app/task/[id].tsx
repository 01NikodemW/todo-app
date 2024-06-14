import { Formik } from "formik";
import { View, TextInput, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { moderateScale, verticalScale } from "@/styles/metrics";
import { TASK_STATUS, TASK_STATUS_ARRAY } from "@/types/constants";
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
    status: task?.status || TASK_STATUS.TODO,
  });

  useEffect(() => {
    setInitialValues({
      title: task?.title || "",
      description: task?.description || "",
      status: task?.status || TASK_STATUS.TODO,
    });
  }, [task, isTaskFetching]);

  const generateIcon = (status: string) => {
    switch (status) {
      case TASK_STATUS.TODO:
        return "create-outline";
      case TASK_STATUS.IN_PROGRESS:
        return "time-outline";
      case TASK_STATUS.DONE:
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
            size={verticalScale(24)}
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
              style={styles.titleInput}
              onChangeText={handleChange("title")}
              onBlur={handleBlur("title")}
              placeholder="title"
              value={values.title}
              editable={isEditing}
            />
            <TextInput
              style={styles.descriptionInput}
              onChangeText={handleChange("description")}
              onBlur={handleBlur("description")}
              placeholder="description"
              value={values.description}
              multiline={true}
              numberOfLines={4}
              editable={isEditing}
            />
            <View>
              <View style={styles.statusContainer}>
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
                      size={verticalScale(30)}
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
              style={styles.editButton}
            >
              <Text style={styles.editText}>
                {isEditing ? "Save Changes" : "Edit"}
              </Text>
            </Pressable>
            {isEditing && (
              <Pressable
                onPress={() => {
                  setIsEditing(false);
                  handleChange("title")(task?.title || "");
                  handleChange("description")(task?.description || "");
                  handleChange("status")(task?.status || TASK_STATUS.TODO);
                }}
                style={styles.cancelButton}
              >
                <Text style={styles.cancelText}>{"Cancel"}</Text>
              </Pressable>
            )}
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  titleInput: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  descriptionInput: {
    height: 200,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  statusContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 12,
  },
  editButton: {
    backgroundColor: "#8d49e8",
    padding: 10,
    margin: 12,
    alignItems: "center",
  },
  editText: {
    color: "white",
    fontWeight: "bold",
  },
  cancelButton: {
    borderColor: "#8d49e8",
    borderWidth: 2,
    padding: 10,
    margin: 12,
    alignItems: "center",
  },
  cancelText: {
    color: "#8d49e8",
    fontWeight: "bold",
  },
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
