import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  FlatList,
  Image,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import CategorySelector from "../components/CategorySelector";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { app } from "../src/firebase/Config";

export default function HomeScreen({ navigation }) {
  const db = getFirestore(app);
  const storage = getStorage(app);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProductList();
  }, []);

  const getProductList = async () => {
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
      <View style={styles.item}>
        <View style={styles.iconContainer}>
          <View style={styles.ratingContainer}>
            <Ionicons name={"star"} size={15} color="gold" />
            <Text>4.7</Text>
          </View>
          <Ionicons name={"heart-outline"} size={15} />
        </View>
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
        <Text style={styles.title}>{item.name}</Text>
        <Text>VNĐ {item.price}</Text>
      </View>
    );
  };

  return (
    <View style={styles.BC}>
      <View style={styles.container}>
        <CategorySelector style={styles.category} navigation={navigation} />
        <FlatList
          data={products}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          style={styles.list}
          contentContainerStyle={styles.listContent}
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
    flex: 1, // Ensure the container takes up the full available height
    marginTop: StatusBar.currentHeight,
  },
  category: {},
  list: {
    flex: 1, // Ensure the list takes up the remaining space in the container
  },
  listContent: {
    paddingBottom: 20, // Optional: add padding to the bottom of the list
    width: 180,
    alignItems: "center",
  },
  item: {
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 16,
  },
  image: {
    width: 150,
    height: 150,
  },
  placeholderImage: {
    width: 150,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e0e0e0",
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
