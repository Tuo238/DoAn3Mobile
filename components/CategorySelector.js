import {
  View,
  Text,
  Button,
  StyleSheet,
  Pressable,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function CategorySelector({ navigation }) {
  return (
    <View style={styles.container}>
      <Pressable
        style={{ alignItems: "flex-end", marginRight: 20, marginTop: 5 }}
      >
        <Ionicons name={"search"} color={"red"} size={30} />
      </Pressable>
      <Text style={styles.text}>Explore</Text>
      {/* <Button
        title="Go to Test"
        onPress={() => navigation.navigate("TestStack")}
      /> */}
      <ScrollView horizontal>
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={() =>
            navigation.navigate("CategorizedProduct", { category: "Sofa" })
          }
        >
          <View style={styles.icon}>
            <Ionicons name={"bed"} size={50} />
          </View>
          <Text style={styles.miniText}>Sofa</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.itemContainer}
          onPress={() =>
            navigation.navigate("CategorizedProduct", { category: "Table" })
          }
        >
          <View style={styles.icon}>
            <Ionicons name={"bed"} size={50} />
          </View>
          <Text style={styles.miniText}>Table</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.itemContainer}
          onPress={() =>
            navigation.navigate("CategorizedProduct", { category: "Chair" })
          }
        >
          <View style={styles.icon}>
            <Ionicons name={"bed"} size={50} />
          </View>
          <Text style={styles.miniText}>Chair</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.itemContainer}
          onPress={() =>
            navigation.navigate("CategorizedProduct", { category: "Lamp" })
          }
        >
          <View style={styles.icon}>
            <Ionicons name={"bed"} size={50} />
          </View>
          <Text style={styles.miniText}>Lamp</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.itemContainer}
          onPress={() =>
            navigation.navigate("CategorizedProduct", { category: "Cabinet" })
          }
        >
          <View style={styles.icon}>
            <Ionicons name={"bed"} size={50} />
          </View>
          <Text style={styles.miniText}>Cabinet</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  //   BC: {
  //     flex: 1,
  //     backgroundColor: "#BAC3C3",
  //   },
  container: {
    // marginTop: StatusBar.currentHeight,
    // paddingLeft: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    padding: 10,
    marginLeft: 20,
  },
  itemContainer: {
    alignItems: "center",
    marginHorizontal: 10,
    marginLeft: 20,
  },
  icon: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  miniText: {},
});
