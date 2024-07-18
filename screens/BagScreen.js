import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  getFirestore,
  doc,
  getDoc,
  query,
  getDocs,
  collection,
} from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { app } from "../src/firebase/Config";

export default function BagScreen({ navigation }) {
  const db = getFirestore(app);
  const storage = getStorage(app);
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  // Lưu thông tin sản phẩm
  const [saveProduct, setSaveProduct] = useState({});

  useEffect(() => {
    const fetchBag = async () => {
      try {
        const q = query(collection(db, "bag"));
        const querySnapshot = await getDocs(q);
        const orders = [];

        querySnapshot.forEach((doc) => {
          if (doc.exists()) {
            orders.push({ id: doc.id, ...doc.data() });
          } else {
            console.log("Document does not exist");
          }
        });

        setData(orders); // Sửa từ bag thành orders
      } catch (error) {
        console.error("Error fetching bag:", error);
      }
    };

    fetchBag();
  }, []);

  // Fetch product images based on product IDs
  useEffect(() => {
    const fetchSaveProduct = async () => {
      const newSaveProduct = {};
      for (const item of data) {
        for (const product of item.product_ids) {
          const productId = product.product_id;
          if (!newSaveProduct[productId]) {
            const productDoc = await getDoc(doc(db, "products", productId));
            if (productDoc.exists()) {
              newSaveProduct[productId] = productDoc.data().image[0]; // Chỉ lấy hình ảnh đầu tiên
            }
          }
        }
      }
      setSaveProduct(newSaveProduct);
    };

    if (data.length > 0) {
      fetchSaveProduct();
    }
  }, [data]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>My Bag</Text>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            {item.product_ids.map((product, index) => (
              <View key={index} style={styles.productRow}>
                {/* Hiển thị hình ảnh sản phẩm */}
                <Image
                  source={{ uri: saveProduct[product.product_id] }}
                  style={styles.productImage}
                />
                <View style={styles.productDetails}>
                  {/* Hiển thị ID của sản phẩm */}
                  <Text style={styles.productId}>Name: {product.name}</Text>
                  {/* Hiển thị số lượng sản phẩm */}
                  <Text style={styles.productQuantity}>
                    Quantity: {product.quantity}
                  </Text>
                </View>
              </View>
            ))}
            {/* Hiển thị tổng giá */}
            <Text style={styles.price}>
              Total: <Text style={styles.priceValue}>{item.total}</Text>
            </Text>
          </View>
        )}
      />

      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.navigate("HomeStack")}
      >
        <Text style={styles.buttonText}>PAY</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
  },
  listItem: {
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: "#f8f8f8",
    borderRadius: 5,
    elevation: 2,
  },
  productRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  productImage: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  productDetails: {
    flex: 1,
  },
  productId: {
    fontSize: 14,
    fontWeight: "bold",
  },
  productQuantity: {
    fontSize: 14,
  },
  price: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 5,
  },
  priceValue: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#ff4081",
  },
  buttonContainer: {
    backgroundColor: "#ff4081",
    paddingVertical: 15,
    marginTop: 20,
    marginHorizontal: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
