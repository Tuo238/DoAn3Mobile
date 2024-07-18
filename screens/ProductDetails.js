import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Carousel from "pinar";

export default function ProductDetails({ route, navigation }) {
  const { item } = route.params;
  const [quantity, setQuantity] = useState(1);

  const addToBag = () => {
    navigation.navigate("BagScreen", {
      productId: item.id,
      productName: item.name,
      productPrice: item.price,
      productImage:
        item.imageUrls && item.imageUrls.length > 0 ? item.imageUrls[0] : null,
      quantity: quantity,
    });
  };

  const incrementQuantity = () => setQuantity(quantity + 1);
  const decrementQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.carouselContainer}>
          <Carousel
            style={styles.carousel}
            showsControls={false}
            dotStyle={styles.dotStyle}
            activeDotStyle={[styles.dotStyle, { backgroundColor: "white" }]}
          >
            {item.imageUrls.map((imageUrl, index) => (
              <Image
                key={index}
                source={{ uri: imageUrl }}
                style={styles.carouselImage}
                resizeMode="contain"
              />
            ))}
          </Carousel>
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.flexbtw}>
            <View style={styles.nameElement}>
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.category}>{item.category}</Text>
            </View>
            <View style={styles.priceElement}>
              <Text style={styles.category}>Price</Text>
              <Text style={styles.price}>₫ {item.price}</Text>
              <View style={styles.quantityContainer}>
                <TouchableOpacity
                  onPress={decrementQuantity}
                  style={styles.quantityButton}
                >
                  <Ionicons name="remove" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.quantityText}>{quantity}</Text>
                <TouchableOpacity
                  onPress={incrementQuantity}
                  style={styles.quantityButton}
                >
                  <Ionicons name="add" size={24} color="black" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <Text style={styles.descriptionTitle}>Description</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </ScrollView>

      <View style={styles.buyButtonContainer}>
        <TouchableOpacity style={styles.addToCartButton} onPress={addToBag}>
          <Ionicons name="bag-add-outline" size={40} color="black" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.buyButton}>
          <Text style={styles.buyButtonText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingBottom: 100,
  },
  carouselContainer: {
    alignItems: "center",
    marginBottom: 30,
    backgroundColor: "#BAC3C3",
    paddingBottom: 30,
  },
  carousel: {
    width: "90%",
    height: 300,
    backgroundColor: "#BAC3C3",
  },
  carouselImage: {
    width: "100%",
    height: "100%",
  },
  detailsContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    padding: 20,
    marginTop: -60,
    marginBottom: 50,
  },
  flexbtw: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  nameElement: {
    width: "60%",
  },
  priceElement: {
    width: "35%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  category: {
    fontSize: 16,
    color: "#888",
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
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
  descriptionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  buyButtonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    padding: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buyButton: {
    backgroundColor: "#FFC107",
    paddingVertical: 15,
    borderRadius: 5,
    width: "80%",
    alignItems: "center",
    marginRight: 5,
  },
  addToCartButton: {
    backgroundColor: "#E0E0E0",
    borderColor: "#E0E0E0",
    width: 60,
    height: 60,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5,
  },
  buyButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    backgroundColor: "#888",
  },
});
