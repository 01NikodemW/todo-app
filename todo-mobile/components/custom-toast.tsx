// CustomToast.ts
import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface CustomToastProps {
  text1?: string;
  text2?: string;
}

const CustomToast: React.FC<CustomToastProps> = ({ text1, text2 }) => {
  return (
    <View
      style={[
        styles.container,
        {
          borderLeftColor: text1 === "Error" ? "#FF0000" : "#00FF00",
        },
      ]}
    >
      {text1 ? <Text style={styles.text1}>{text1}</Text> : null}
      {text2 ? <Text style={styles.text2}>{text2}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    width: "80%",
    backgroundColor: "#fff",
    borderLeftWidth: 4,
    elevation: 2,
    borderRadius: 6,
  },
  text1: {
    fontSize: 18,
    fontWeight: "bold",
  },
  text2: {
    fontSize: 16,
    marginTop: 8,
  },
});

export default CustomToast;
