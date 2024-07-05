import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  FlatList,
  Image,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import CategorySelector from "../components/CategorySelector";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { app } from "../src/firebase/Config";

export default function HomeScreen({ navigation }) {
  const db = getFirestore(app);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProductList();
  }, []);

  // const getProductList = async () => {
  //   const querySnapshot = await getDocs(collection(db, "products"));
  //   querySnapshot.forEach((doc) => {
  //     // doc.data() is never undefined for query doc snapshots
  //     console.log("Docs: ", doc.data());
  //   });
  // };

  const getProductList = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsList);
    } catch (error) {
      console.error("Error fetching products: ", error);
    }
  };

  const renderItem = ({ item }) => {
    const imageUrl =
      item.images && item.images.length > 0 ? item.images[0] : null;

    return (
      <View style={styles.item}>
        <View style={styles.iconContainer}>
          <View style={styles.ratingContainer}>
            <Ionicons name={"star-outline"} size={15} />
            <Text>4.7</Text>
          </View>
          <Ionicons name={"heart-outline"} size={15} />
        </View>
        <View>
          <Image
            source={require("../assets/Jasper-Arm-Chair-1.1-1.jpg")} // Use the first image URL
            style={styles.image}
            resizeMode="cover"
            // style={styles.imageContainer}
          />
        </View>
        <Text style={styles.title}>{item.name}</Text>
        <Text>dwh {item.price}</Text>
      </View>
    );
  };

  console.log(products);
  return (
    <View style={styles.BC}>
      <View style={styles.container}>
        <CategorySelector style={styles.category} navigation={navigation} />
        <FlatList
          data={products}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          style={styles.list}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  BC: {
    flex: 1,
    backgroundColor: "#BAC3C3",
    paddingLeft: 20,
  },
  container: {
    marginTop: StatusBar.currentHeight,
  },
  category: {},
  list: {
    marginTop: 20,
  },
  item: {
    backgroundColor: "#fff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 16,
  },
  imageContainer: {
    width: 200,
    height: 200,
  },
});
