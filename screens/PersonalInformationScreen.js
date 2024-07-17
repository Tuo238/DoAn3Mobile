import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { app } from "../src/firebase/Config";
import { useRoute } from "@react-navigation/native";
export default function PersonalInformationScreen({ navigation }) {
  const db = getFirestore(app);
  const auth = getAuth(app);
  const [user, setUser] = useState(null);
  const route = useRoute(); // Khai báo route

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        await getUserById(currentUser.uid);
      } else {
        console.log("No user is signed in.");
      }
    };

    fetchUser();
  }, []);

  // Cập nhật khi có dữ liệu mới từ UpdateProfile
  useEffect(() => {
    if (route.params?.updatedUser) {
      setUser(route.params.updatedUser); // Cập nhật thông tin người dùng
    }
  }, [route.params?.updatedUser]);

  const getUserById = async (userId) => {
    try {
      const userDoc = doc(db, "users", userId);
      const docSnapshot = await getDoc(userDoc);

      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        const userData = {
          id: docSnapshot.id,
          name: data.name,
          address: data.address,
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
          <Text style={styles.nd}>{user.name || "N/A"}</Text>
        </View>

        <View style={styles.item3}>
          <Text style={styles.nd}>{user.address || "N/A"}</Text>
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
          style={styles.button}
          onPress={() => navigation.navigate("UpdateProfile", { item: user })}
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
    marginBottom: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    width: 300,
    height: 40,
  },
  item3: {
    marginBottom: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    width: 300,
    height: 40,
  },
  item4: {
    marginBottom: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    width: 300,
    height: 40,
  },
  item5: {
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
