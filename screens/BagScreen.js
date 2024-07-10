import React, { useState, useEffect } from "react";

import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  StatusBar,
  TouchableOpacity,
  Image,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import HomeScreen from "./HomeScreen";
import CategorySelector from "../components/CategorySelector";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { app } from "../src/firebase/Config";

export default function LikeScreen({ navigation, route }) {
  const db = getFirestore(app);
  const storage = getStorage(app);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getBagList();
  }, []);

  const getBagList = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productsList = await Promise.all(
        querySnapshot.docs.map(async (doc) => {
          const data = doc.data();
          // console.log(`Product: ${data.name}, Image paths: ${data.images}`); // Debug log

          const imageUrls = await Promise.all(
            (data.image || []).map(async (imagePath) => {
              try {
                const storageRef = ref(storage, imagePath);
                const url = await getDownloadURL(storageRef);
                // console.log(`Fetched URL: ${url}`); // Debug log
                return url;
              } catch (error) {
                console.error(`Error fetching URL for ${imagePath}:`, error);
                return null;
              }
            })
          );

          // console.log(`Product: ${data.name}, Image URLs: ${imageUrls}`); // Debug log
          return {
            id: doc.id,
            ...data,
            imageUrls: imageUrls.filter((url) => url !== null), // Filter out null URLs
          };
        })
      );
      setProducts(productsList);
    } catch (error) {
      console.error("Error fetching products: ", error);
    }
  };

  const renderItem = ({ item }) => {
    const imageUrl =
      item.imageUrls && item.imageUrls.length > 0 ? item.imageUrls[0] : null;
    return (
      <TouchableOpacity>
        <View style={styles.item}>
          <View style={styles.imageContainer}>
            {imageUrl ? (
              <Image
                source={{ uri: imageUrl }}
                style={styles.image}
                resizeMode="cover"
              />
            ) : (
              <View style={styles.placeholderImage}>
                <Text>No Image</Text>
              </View>
            )}
          </View>
          <View style={styles.innerItem}>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.price}>₫ {item.price}</Text>
            <View style={styles.ratingContainer}>
              <Ionicons
                name={"remove-circle-outline"}
                size={30}
                color="black"
              />
              <Text style={styles.quantity}>4.7</Text>
              <Ionicons name={"add-circle-outline"} size={30} color="black" />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.BQ}>
      <View style={styles.container}>
        <Text style={styles.maintitle}>My Bag</Text>
        <FlatList
          data={products}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          style={styles.list}
          contentContainerStyle={styles.listContent}
          numColumns={1}
        />
      </View>

      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.navigate("HomeStack")}
      >
        <Text style={styles.buttonText}>PAY</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  BQ: {
    flex: 1,
    backgroundColor: "#BAC3C3",
  },
  container: {
    flex: 1, // Ensure the container takes up the full available height
    alignItems: "center",
    justifyContent: "center",
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 20, // Optional: add padding to the bottom of the list
    alignItems: "center",
    justifyContent: "center",
  },
  quantity: {
    fontSize: 19,
    marginLeft: 5,
    marginRight: 5,
    fontWeight: "bold",
  },
  maintitle: {
    fontSize: 30,
    color: "black",
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 20,
  },
  item: {
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 5,
    width: 300,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  imageContainer: {
    marginRight: 50,
  },
  innerItem: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "column", // Stack elements vertically
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  price: {
    fontSize: 16,
    color: "#333",
    marginVertical: 5,
    fontWeight: "bold",
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
  placeholderImage: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonContainer: {
    justifyContent: "center",
    backgroundColor: "#AABB5D",
    paddingVertical: 12,
    paddingHorizontal: 70,
    borderRadius: 30,
    position: "absolute",
    alignSelf: "center",
    bottom: 50,
  },
  buttonText: {
    fontSize: 25,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});
