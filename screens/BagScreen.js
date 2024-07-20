import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Alert,
} from "react-native";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  query,
  getDocs,
  collection,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { app } from "../src/firebase/Config";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function BagScreen({ route, navigation }) {
  const db = getFirestore(app);
  const [data, setData] = useState([]); //lưu trữ dữ liệu giỏ hàng
  const [saveProduct, setSaveProduct] = useState({}); //tt sản phẩm
  const [quantities, setQuantities] = useState({});
  const [loading, setLoading] = useState(true); //tải dữ liệu
  const [error, setError] = useState(null); //xử lý lỗi
  const bagId = "HiejJHSzPTaPKCJW1pCQ"; // Sử dụng ID tài liệu giỏ hàng

  const fetchBag = useCallback(async () => {
    try {
      const q = query(collection(db, "bag")); //truy xuất vào bag
      const querySnapshot = await getDocs(q);
      const orders = [];

      // Lặp qua các document trong snapshot và đẩy vào mảng orders
      querySnapshot.forEach((doc) => {
        if (doc.exists()) {
          orders.push({ id: doc.id, ...doc.data() });
        } else {
          console.log("Document does not exist");
        }
      });

      setData(orders); //cập nhật state data
    } catch (error) {
      console.error("Error fetching bag:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [db]);

  //lấy chi tiết sp dựa vào id
  useEffect(() => {
    fetchBag();
  }, [fetchBag]);

  useEffect(() => {
    const fetchSaveProduct = async () => {
      const newSaveProduct = {};
      const newQuantities = {};
      for (const item of data) {
        for (const product of item.product_ids) {
          const productId = product.product_id;
          if (!newSaveProduct[productId]) {
            const productDoc = await getDoc(doc(db, "products", productId));
            if (productDoc.exists()) {
              const productData = productDoc.data();
              newSaveProduct[productId] = {
                name: productData.name,
                image: productData.image[0],
                price: productData.price,
              };
              newQuantities[productId] = product.quantity;
            }
          }
        }
      }
      setSaveProduct(newSaveProduct);
      setQuantities(newQuantities);
    };

    if (data.length > 0) {
      fetchSaveProduct();
    }
  }, [data, db]);

  //kiểm tra route params để thêm sản phẩm vào giỏ hàng
  useEffect(() => {
    if (route.params) {
      const { productId, productName, productPrice, productImage, quantity } =
        route.params;
      addProductToBag(
        productId,
        productName,
        productPrice,
        productImage,
        quantity
      );
    }
  }, [route.params]);

  // thêm sp vào giỏ hàng
  const addProductToBag = async (
    productId,
    productName,
    productPrice,
    productImage,
    quantity
  ) => {
    try {
      const bagRef = doc(db, "bag", bagId);
      const bagDoc = await getDoc(bagRef);

      if (!bagDoc.exists()) {
        // Tạo document giỏ hàng nếu chưa tồn tại
        await setDoc(bagRef, {
          product_ids: [{ product_id: productId, quantity }],
        });
      } else {
        // Cập nhật document giỏ hàng nếu đã tồn tại
        await updateDoc(bagRef, {
          product_ids: arrayUnion({ product_id: productId, quantity }),
        });
      }

      fetchBag(); // Làm mới dữ liệu giỏ hàng sau khi thêm sản phẩm
    } catch (error) {
      console.error("Error adding product to bag:", error);
      setError(error);
    }
  };

  // tăng số lượng sản phẩm
  const incrementQuantity = (productId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: (prevQuantities[productId] || 0) + 1,
    }));
  };

  // Hàm giảm số lượng sản phẩm
  const decrementQuantity = (productId) => {
    setQuantities((prevQuantities) => {
      const currentQuantity = prevQuantities[productId] || 1;
      if (currentQuantity > 1) {
        return {
          ...prevQuantities,
          [productId]: currentQuantity - 1,
        };
      }
      return prevQuantities;
    });
  };

  // Hàm xác nhận xóa sản phẩm khỏi giỏ hàng

  const confirmDeleteProduct = (orderId, productId) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this product?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => deleteProduct(orderId, productId),
        },
      ]
    );
  };

  const deleteProduct = async (orderId, productId) => {
    try {
      const orderRef = doc(db, "bag", orderId);
      const orderDoc = await getDoc(orderRef);
      if (orderDoc.exists()) {
        const orderData = orderDoc.data();
        const updatedProducts = orderData.product_ids.filter(
          (product) => product.product_id !== productId
        );

        await updateDoc(orderRef, {
          product_ids: updatedProducts,
        });

        fetchBag(); // Làm mới dữ liệu giỏ hàng sau khi xóa sản phẩm
      } else {
        console.log("Order does not exist");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Error: {error.message}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>My Cart</Text>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            {item.product_ids.map((product, index) => {
              const productId = product.product_id;
              const savedProduct = saveProduct[productId] || {};
              const productName = savedProduct.name || "Unknown Product";
              const productImage = savedProduct.image || "";
              const productPrice = savedProduct.price || 0;
              const productQuantity =
                quantities[productId] || product.quantity || 1;

              return (
                <View key={index} style={styles.productRow}>
                  <Image
                    source={{ uri: productImage }}
                    style={styles.productImage}
                  />
                  <View style={styles.productDetails}>
                    <View style={styles.productInfo}>
                      <Text style={styles.productName}>
                        Name: {productName}
                      </Text>
                      <View style={styles.quantityContainer}>
                        <TouchableOpacity
                          onPress={() => decrementQuantity(productId)}
                          style={styles.quantityButton}
                        >
                          <Ionicons name="remove" size={10} color="black" />
                        </TouchableOpacity>
                        <Text style={styles.quantityText}>
                          {productQuantity}
                        </Text>
                        <TouchableOpacity
                          onPress={() => incrementQuantity(productId)}
                          style={styles.quantityButton}
                        >
                          <Ionicons name="add" size={10} color="black" />
                        </TouchableOpacity>
                      </View>
                      <Text style={styles.productPrice}>
                        Price: ${productPrice}
                      </Text>
                      <Text style={styles.totalProductPrice}>
                        Total Price: $
                        {(productPrice * productQuantity).toFixed(2)}
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => confirmDeleteProduct(item.id, productId)}
                      style={styles.deleteButton}
                    >
                      <Ionicons name="trash" size={18} color="red" />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
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
  loadingText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
  errorText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
    color: "red",
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
    marginLeft: 10,
    marginTop: 20,
  },
  productImage: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 10,
  },
  productDetails: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 20,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 14,
    fontWeight: "bold",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    marginTop: 10,
    marginBottom: 10,
  },
  quantityButton: {
    backgroundColor: "#E0E0E0",
    padding: 10,
    borderRadius: 5,
  },
  quantityText: {
    fontSize: 18,
    marginHorizontal: 10,
  },
  productPrice: {
    fontSize: 14,
    color: "#555",
    fontWeight: "bold",
  },
  totalProductPrice: {
    fontSize: 15,
    color: "#555",
    marginTop: 5,
    fontWeight: "bold",
    color: "red",
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
  deleteButton: {
    backgroundColor: "#E0E0E0",
    padding: 10,
    borderRadius: 5,
  },
});
