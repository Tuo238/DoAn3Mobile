import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { app, auth, firestore } from "../src/firebase/Config";
import { sendPasswordResetEmail } from "firebase/auth";

export default function ForgotPassword({ navigation }) {
  const [email, setEmail] = useState("");

  const forgotPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert("Success", "Password reset email sent successfully!");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>
      <View style={styles.InputContainer}>
        <TextInput
          placeholder="Email"
          style={styles.InputStyle}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
      </View>

      <TouchableOpacity style={styles.signinButton} onPress={forgotPassword}>
        <Text style={styles.signinText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    marginHorizontal: 20,
  },
  InputContainer: {
    alignItems: "center",
  },
  InputStyle: {
    width: "100%",
    height: 50,
    alignItems: "center",
    borderColor: "green",
    borderRadius: 15,
    backgroundColor: "#E0E0E0",
    margin: 5,
    padding: 12,
    fontSize: 15,
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    marginBottom: 16,
    padding: 10,
    marginLeft: 10,
    marginTop: 60,
  },
  signinButton: {
    width: "100%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "green",
    borderRadius: 15,
    backgroundColor: "#BAC3C3",
    marginVertical: 10,
    padding: 12,
  },
  signinText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
  },
});
