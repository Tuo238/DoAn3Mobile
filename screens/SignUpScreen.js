import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../src/firebase/Config";

export default function SignUpScreen({ navigation, route }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleSignUp = () => {
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert("Error", "Please enter a valid email address.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    setIsLoading(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up successfully
        const user = userCredential.user;
        console.log("User signed up:", user.uid);
        setIsLoading(false);
        // Navigate to another screen or perform other actions upon success
      })
      .catch((error) => {
        setIsLoading(false);
        Alert.alert("Error", error.message);
        console.error("Error signing up:", error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <View style={styles.InputContainer}>
        <TextInput
          placeholder="First name"
          style={styles.InputStyle}
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          style={styles.InputStyle}
          placeholder="Last name"
          value={lastName}
          onChangeText={setLastName}
        />
        <TextInput
          placeholder="Email address"
          style={styles.InputStyle}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.InputStyle}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
          secureTextEntry
        />
        <TextInput
          style={styles.InputStyle}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          autoCapitalize="none"
          secureTextEntry
        />
      </View>

      <TouchableOpacity
        style={styles.signinButton}
        onPress={handleSignUp}
        disabled={isLoading} // Disable button when loading
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text style={styles.signinText}>Continue</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.googleButton}>
        <Ionicons name={"logo-google"} size={27} color="white" />
        <Text style={styles.googleText}>Continue with Google</Text>
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
    marginTop: 50,
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
