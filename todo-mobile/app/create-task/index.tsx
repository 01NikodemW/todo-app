import { useCreateTask } from "@/api/tasks/use-create-task";
import { CreateTaskRequest } from "@/types/api/tasks/create-task-request";
import { Formik } from "formik";
import { View, TextInput, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { moderateScale } from "@/styles/metrics";
import { TASK_STATUS_ARRAY } from "@/types/constants";

export default function CreateTask() {
  const initialValues: CreateTaskRequest = {
    title: "",
    description: "",
    status: "todo",
  };

  const createTask = useCreateTask();

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
              style={{ height: 40, margin: 12, borderWidth: 1, padding: 10 }}
              onChangeText={handleChange("title")}
              onBlur={handleBlur("title")}
              placeholder="title"
              value={values.title}
            />
            <TextInput
              style={{ height: 200, margin: 12, borderWidth: 1, padding: 10 }}
              onChangeText={handleChange("description")}
              onBlur={handleBlur("description")}
              placeholder="description"
              value={values.description}
              multiline={true}
              numberOfLines={4}
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
                      size={moderateScale(30)}
                      color="black"
                    />
                    <Text>{status}</Text>
                  </Pressable>
                ))}
              </View>
            </View>

            <Pressable
              onPress={() => handleSubmit()}
              style={{
                backgroundColor: "#8d49e8",
                padding: 10,
                margin: 12,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                Submit
              </Text>
            </Pressable>
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
