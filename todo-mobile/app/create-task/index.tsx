import { useCreateTask } from "@/api/tasks/use-create-task";
import { CreateTaskRequest } from "@/types/api/tasks/create-task-request";
import { Formik } from "formik";
import { View, TextInput, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { moderateScale, verticalScale } from "@/styles/metrics";
import { TASK_STATUS, TASK_STATUS_ARRAY } from "@/constants/Statuses";

export default function CreateTask() {
  const initialValues: CreateTaskRequest = {
    title: "",
    description: "",
    status: TASK_STATUS.TODO,
  };

  const createTask = useCreateTask();

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

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          createTask(values);
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
            />
            <TextInput
              style={styles.descriptionInput}
              onChangeText={handleChange("description")}
              onBlur={handleBlur("description")}
              placeholder="description"
              value={values.description}
              multiline={true}
              numberOfLines={4}
            />
            <View style={styles.statusContainer}>
              {TASK_STATUS_ARRAY.map((status) => (
                <Pressable
                  key={status}
                  onPress={() => {
                    handleChange("status")(status);
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

            <Pressable
              onPress={() => handleSubmit()}
              style={styles.submitButton}
            >
              <Text style={styles.submitText}>Submit</Text>
            </Pressable>
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
  submitButton: {
    backgroundColor: "#8d49e8",
    padding: 10,
    margin: 12,
    alignItems: "center",
  },
  submitText: {
    color: "white",
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
