import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../src/firebase/Config";

export default function Signin({ navigation }) {
  const auth = getAuth(app);

  const [emailSI, setEmail] = useState("");
  const [passwordSI, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, emailSI, passwordSI);
      navigation.navigate("Main"); // Navigate to your home screen or desired screen after sign-in
    } catch (error) {
      console.error("Error signing in:", error);
      alert("Error signing in. Please check your email and password.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign in</Text>
      <View style={styles.InputContainer}>
        <TextInput
          placeholder="Email"
          style={styles.InputStyle}
          value={emailSI}
          onChangeText={setEmail}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.InputStyle}
          placeholder="Password"
          value={passwordSI}
          onChangeText={setPassword}
          autoCapitalize="none"
          secureTextEntry
        />
      </View>
      <View style={styles.textContainer}>
        <Text>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("SignUpScreen")}>
          <Text style={styles.boldText}> Create One</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.textContainer}>
        <Text>Forgot password?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
          <Text style={styles.boldText}> Reset Password</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.signinButton}
        onPress={handleSignIn}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text style={styles.signinText}>Sign in</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.googleButton}>
        <Ionicons name={"logo-google"} size={27} color="white" />
        <Text style={styles.googleText}>Sign in with Google</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensure the container takes up the full available height
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
  textContainer: {
    flexDirection: "row",
    marginLeft: 7,
    padding: 5,
    marginVertical: 5,
  },
  boldText: {
    fontWeight: "bold",
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
  googleButton: {
    width: "100%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "green",
    borderRadius: 15,
    backgroundColor: "#BAC3C3",
    marginVertical: 10,
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  googleText: {
    width: "90%",
    textAlign: "right",
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
  },
});
