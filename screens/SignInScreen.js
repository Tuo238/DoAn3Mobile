import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  TextInput,
} from "react-native";

export default function Signin() {
  const { email, setEmail } = useState("");
  return (
    <View style={styles.container}>
      <Text>Signin {email}</Text>
      <View style={styles.InputContainer}>
        <TextInput
          style={styles.InputStyle}
          value={email}
          onChangeText={setEmail}
        />
        <TextInput style={styles.InputStyle} />
        <Text></Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensure the container takes up the full available height
    marginTop: StatusBar.currentHeight,
  },
  InputContainer: {
    alignItems: "center",
  },
  InputStyle: {
    width: "88%",
    height: 50,
    alignItems: "center",
    borderColor: "green",
    borderRadius: 15,
    backgroundColor: "#E0E0E0",
    margin: 10,
    padding: 12,
  },
});
