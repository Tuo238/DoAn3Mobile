import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function TestStack({ navigation, route }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>TestStack</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
});
