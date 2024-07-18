import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { doc, getDoc, updateDoc, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { app } from "../src/firebase/Config";
import { useRoute } from "@react-navigation/native";

export default function UpdateDelivery({ navigation }) {
  const db = getFirestore(app);
  const auth = getAuth(app); //tạo firebase
  const [user, setUser] = useState(null); //lưu thông tin

  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const route = useRoute(); // Khai báo route

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        await getUserById(currentUser.uid); //lấy tt từ firestore
      } else {
        console.log("No user is signed in.");
      }
    };

    fetchUser();
  }, []);

  const getUserById = async (userId) => {
    try {
      const userDoc = doc(db, "users", userId); //tham chiếu đến FS
      const docSnapshot = await getDoc(userDoc); //lấy tl

      if (docSnapshot.exists()) {
        const data = docSnapshot.data(); //lấy dl
        setUser({
          id: docSnapshot.id,
          address: data.address,
          email: data.email,
        });
        //cập nhật tt

        setAddress(data.address || "");

        setEmail(data.email || "");
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching user: ", error);
    }
  };

  const handleUpdate = async () => {
    if (user) {
      try {
        const userDoc = doc(db, "users", user.id);
        await updateDoc(userDoc, {
          address,
          email,
        });
        console.log("User updated successfully!");

        // Truyền dữ liệu đã cập nhật về PersonalInformationScreen
        navigation.navigate("PersonalInformationScreen", {
          //quay về mh
          updatedUser: { ...user, name, address, email }, // Truyền thông tin đã cập nhật
        });
      } catch (error) {
        console.error("Error updating user: ", error);
      }
    }
  };

  const renderUser = () => {
    if (!user) return null;

    return (
      <View style={styles.itemcontainer}>
        <View style={styles.item1}>
          <TextInput
            style={styles.nd}
            value={address}
            onChangeText={setAddress}
            placeholder="Address"
          />
        </View>

        <View style={styles.item2}>
          <TextInput
            style={styles.nd}
            value={email}
            onChangeText={setEmail}
            placeholder="email"
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.BC}>
      <View style={styles.container}>
        <Text style={styles.maintitle}>UPDATE DELIVERY</Text>
        <Text style={styles.maintitle}>ADDRESS</Text>
        {renderUser()}

        <TouchableOpacity style={styles.button} onPress={handleUpdate}>
          <Text style={styles.buttonText}>UPDATE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  BC: {
    flex: 1,
    backgroundColor: "#BAC3C3",
  },
  container: {
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
    margin: 22,
  },
  maintitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    top: 1,
  },
  itemcontainer: {
    padding: "auto",
    marginTop: 20,
    borderRadius: 8,
    width: "90%",
  },
  item1: {
    marginBottom: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    width: 300,
    height: 40,
  },
  item2: {
    marginBottom: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    width: 300,
    height: 40,
  },
  nd: {
    margin: 10,
  },
  button: {
    backgroundColor: "#AABB5D",
    width: 150,
    height: 35,
    justifyContent: "center",
    textAlign: "center",
    borderRadius: 10,
  },
  buttonText: {
    justifyContent: "center",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});
