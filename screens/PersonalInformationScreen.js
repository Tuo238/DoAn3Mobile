import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Button,
  TouchableOpacity,
} from "react-native";

import { doc, getDoc, getFirestore } from "firebase/firestore";
import { app } from "../src/firebase/Config";

export default function PersonalInformationScreen({ navigation }) {
  const db = getFirestore(app);
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUserById("5kRGmH6lLlWwBbwKt1ZEMJtIOy73"); // Thay đổi ID người dùng thực tế ở đây
  }, []);

  const getUserById = async (userId) => {
    try {
      const userDoc = doc(db, "users", userId);
      const docSnapshot = await getDoc(userDoc);

      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        const userData = {
          id: docSnapshot.id,
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone, // Thêm trường số điện thoại
          createdAt: data.createdAt
            ? data.createdAt.toDate().toLocaleString()
            : "N/A",
          email: data.email,
        };
        setUser(userData);
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching user: ", error);
    }
  };

  const renderUser = () => {
    if (!user) return null;

    return (
      <View style={styles.itemcontainer}>
        <View style={styles.item1}>
          <Text style={styles.nd}>{user.firstName || "N/A"}</Text>
        </View>

        <View style={styles.item2}>
          <Text style={styles.nd}>{user.lastName || "N/A"}</Text>
        </View>

        <View style={styles.item3}>
          <Text style={styles.nd}>{user.phone || "N/A"}</Text>
        </View>

        <View style={styles.item4}>
          <Text style={styles.nd}>{user.createdAt}</Text>
        </View>

        <View style={styles.item5}>
          <Text style={styles.nd}>{user.email || "N/A"}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.BC}>
      <View style={styles.container}>
        <Text style={styles.maintitle}>VIEW PERSONAL</Text>
        <Text style={styles.maintitle}>INFORMATION</Text>
        {renderUser()}

        <TouchableOpacity
          style={styles.button} // Thêm kiểu dáng cho nút
          onPress={() => navigation.navigate("UpdateProfile", { item: user })} // Thay đổi 'item' nếu cần
        >
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
    marginBottom: 20, // Khoảng cách giữa các phần tử
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    width: 300,
    height: 40,
  },
  item2: {
    marginBottom: 20, // Khoảng cách giữa các phần tử
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    width: 300,
    height: 40,
  },
  item3: {
    marginBottom: 20, // Khoảng cách giữa các phần tử
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    width: 300,
    height: 40,
  },
  item4: {
    marginBottom: 20, // Khoảng cách giữa các phần tử
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    width: 300,
    height: 40,
  },
  item5: {
    marginBottom: 20, // Khoảng cách giữa các phần tử
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    width: 300,
    height: 40,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  ltname: {
    fontSize: 16,
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
