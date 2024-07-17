import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Keyboard,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { app } from "../src/firebase/Config";

export default function SearchScreen({ navigation, route }) {
  // const { category } = route.params;
  const db = getFirestore(app);
  const storage = getStorage(app);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (searchText.trim() !== "") {
      getProductList();
    } else {
      setProducts([]);
    }
  }, [searchText]);

  const getProductList = async () => {
    setIsLoading(true);
    try {
      const q = query(
        collection(db, "products"),
        // where("category", "==", sofa),
        where("category", "==", searchText.trim())
      );
      const querySnapshot = await getDocs(q);

      const productsList = await Promise.all(
        querySnapshot.docs.map(async (doc) => {
          const data = doc.data();

          const imageUrls = await Promise.all(
            (data.image || []).map(async (imagePath) => {
              try {
                const storageRef = ref(storage, imagePath);
                const url = await getDownloadURL(storageRef);
                return url;
              } catch (error) {
                console.error(`Error fetching URL for ${imagePath}:`, error);
                return null;
              }
            })
          );

          return {
            id: doc.id,
            ...data,
            imageUrls: imageUrls.filter((url) => url !== null),
          };
        })
      );
      setProducts(productsList);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching products: ", error);
      setIsLoading(false);
    }
  };

  const handleSearchInputChange = (text) => {
    setSearchText(text);
  };

  const handleSearchSubmit = () => {
    Keyboard.dismiss(); // Dismiss keyboard after pressing enter
    getProductList();
  };

  const renderItem = ({ item }) => {
    const imageUrl =
      item.imageUrls && item.imageUrls.length > 0 ? item.imageUrls[0] : null;
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("ProductDetails", { item })}
        // style={styles.item}
      >
        <View style={styles.item}>
          <View style={styles.iconContainer}>
            <View style={styles.ratingContainer}>
              <Ionicons name={"star"} size={15} color="gold" />
              <Text>4.7</Text>
            </View>
            <Ionicons name={"heart-outline"} size={15} />
          </View>
          <View style={styles.innerItem}>
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
            <Text style={styles.title} numberOfLines={2}>
              {item.name}
            </Text>
            <Text>₫ {item.price}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.BC}>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <Ionicons name={"search"} size={30} />
          <TextInput
            placeholder="Search"
            style={styles.searchInput}
            value={searchText}
            onChangeText={handleSearchInputChange}
            onSubmitEditing={handleSearchSubmit}
          />
        </View>
        {isLoading ? (
          <ActivityIndicator size="large" color="white" />
        ) : searchText.trim() !== "" ? (
          <FlatList
            data={products}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            style={styles.list}
            contentContainerStyle={styles.listContent}
            numColumns={2}
          />
        ) : null}
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
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  list: {
    flex: 1,
    width: "100%",
  },
  listContent: {
    paddingBottom: 20,
    alignItems: "center",
  },
  searchContainer: {
    flexDirection: "row",
    marginHorizontal: 30,
    marginVertical: 20,
    backgroundColor: "#FFF",
    borderRadius: 25,
    padding: 10,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    textAlign: "center",
  },
  item: {
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 5,
    width: "95%",
    justifyContent: "center",
    borderRadius: 10,
  },
  innerItem: {
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    height: 50,
    width: 100,
  },
  image: {
    width: 150,
    height: 150,
    justifyContent: "center",
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
