import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { app } from "../src/firebase/Config";
import { useRoute } from "@react-navigation/native";

export default function PersonalInformationScreen({ navigation }) {
  const db = getFirestore(app);
  const auth = getAuth(app);
  const [user, setUser] = useState(null); // Lưu trữ thông tin người dùng
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
      const userDoc = doc(db, "users", userId); // Truy xuất vào users
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

  // Render thông tin người dùng
  const renderUser = () => {
    if (!user) return null;

    return (
      <View style={styles.itemcontainer}>
        <View style={styles.item}>
          <Text style={styles.element}>Full Name:</Text>
          <Text style={styles.nd}>{user.name || "N/A"}</Text>
        </View>

        <View style={styles.item}>
          <Text style={styles.element}>Address:</Text>
          <Text style={styles.nd}>{user.address || "N/A"}</Text>
        </View>

        <View style={styles.item}>
          <Text style={styles.element}>Date of Birth:</Text>
          <Text style={styles.nd}>{user.createdAt}</Text>
        </View>

        <View style={styles.item}>
          <Text style={styles.element}>Email:</Text>
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

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.buttonBack}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>BACK</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonUpdate}
            onPress={() => navigation.navigate("UpdateProfile", { item: user })}
          >
            <Text style={styles.buttonText}>UPDATE</Text>
          </TouchableOpacity>
        </View>
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
    width: "90%",
    marginTop: 20,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
  },
  element: {
    fontWeight: "bold",
    width: 120,
    paddingLeft: 10,
  },
  nd: {
    marginLeft: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginTop: 20,
  },
  buttonBack: {
    backgroundColor: "#AABB5D",
    width: 150,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  buttonUpdate: {
    backgroundColor: "#AABB5D",
    width: 150,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
});
