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
  Modal,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { app } from "../src/firebase/Config";

export default function SearchScreen({ navigation }) {
  const db = getFirestore(app);
  const storage = getStorage(app);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [modalVisible, setVisible] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc"); // asc for ascending, desc for descending
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (searchText.trim() !== "") {
      // getProductList();
    } else {
      setProducts([]);
    }
  }, [searchText, sortOrder, minPrice, maxPrice]);

  const getProductList = async () => {
    setIsLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "products"));

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

      // Filter products based on search text and price range
      const filteredProducts = productsList.filter((product) => {
        const matchesCategory =
          product.name &&
          product.name.toLowerCase().includes(searchText.trim().toLowerCase());
        // const withinPriceRange =
        //   (!minPrice || product.price >= parseFloat(minPrice)) &&
        //   (!maxPrice || product.price <= parseFloat(maxPrice));

        // return matchesCategory && withinPriceRange;
        return matchesCategory;
      });

      // Sort products by price based on sortOrder
      filteredProducts.sort((a, b) => {
        if (sortOrder === "asc") {
          return a.price - b.price;
        } else {
          return b.price - a.price;
        }
      });

      setProducts(filteredProducts);
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

  const handleRefresh = () => {
    setRefreshing(true);
    getProductList().finally(() => setRefreshing(false));
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
          <TouchableOpacity onPress={() => setVisible(true)}>
            <Ionicons name={"menu-outline"} size={30} />
          </TouchableOpacity>
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
            refreshing={refreshing}
            onRefresh={handleRefresh}
          />
        ) : null}
        <Modal
          visible={modalVisible}
          onRequestClose={() => setVisible(false)}
          style={styles.modalContainer}
          animationType="slide"
        >
          <View>
            <Text style={styles.modalTitle}>Price Range:</Text>
            <View style={styles.modalInputContainer}>
              <TextInput
                placeholder="MINIMUM"
                style={styles.modalInputStyle}
                keyboardType="number-pad"
                value={minPrice}
                onChangeText={(text) => setMinPrice(text)}
              />
              <TextInput
                placeholder="MAXIMUM"
                style={styles.modalInputStyle}
                keyboardType="number-pad"
                value={maxPrice}
                onChangeText={(text) => setMaxPrice(text)}
              />
            </View>

            <Text style={styles.modalTitle}>Sort by:</Text>

            <View style={styles.sortButtonsContainer}>
              <TouchableOpacity
                onPress={() => {
                  setSortOrder("asc");
                  getProductList();
                  setVisible(false);
                }}
                style={styles.sortButtons}
              >
                <Text>Lowest to Highest</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setSortOrder("desc");
                  getProductList();
                  setVisible(false);
                }}
                style={styles.sortButtons}
              >
                <Text>Highest to Lowest</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setMinPrice("");
                  setMaxPrice("");
                  setSortOrder("asc");
                  setVisible(false);
                }}
                style={styles.sortButtons}
              >
                <Text>Discard Filter</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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
  modalContainer: {
    height: 50,
    borderRadius: 50,
  },
  modalInputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: -50,
  },
  modalInputStyle: {
    width: "45%",
    height: 50,
    alignItems: "center",
    borderColor: "green",
    borderRadius: 15,
    backgroundColor: "#E0E0E0",
    margin: 5,
    padding: 12,
    fontSize: 15,
  },
  modalTitle: {
    fontSize: 34,
    fontWeight: "bold",
    marginBottom: 10,
    padding: 10,
    marginLeft: 10,
    marginTop: 60,
  },
  sortButtonsContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  sortButtons: {
    width: "90%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "green",
    borderRadius: 15,
    backgroundColor: "#BAC3C3",
    marginVertical: 10,
    padding: 12,
  },
});
