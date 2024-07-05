import {
  View,
  Text,
  Button,
  StyleSheet,
  Pressable,
  StatusBar,
  ScrollView,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function CategorySelector({ navigation }) {
  return (
    <View>
      <Pressable
        style={{ alignItems: "flex-end", marginRight: 20, marginTop: 5 }}
      >
        <Ionicons name={"search"} size={30} />
      </Pressable>
      <Text style={styles.text}>Explore</Text>
      {/* <Button
        title="Go to Test"
        onPress={() => navigation.navigate("TestStack")}
      /> */}
      <ScrollView horizontal>
        <View style={styles.itemContainer}>
          <View style={styles.icon}>
            <Ionicons name={"bed"} size={50} />
          </View>
          <Text style={styles.miniText}>Sofa</Text>
        </View>

        <View style={styles.itemContainer}>
          <View style={styles.icon}>
            <Ionicons name={"bed"} size={50} />
          </View>
          <Text style={styles.miniText}>Sofa</Text>
        </View>

        <View style={styles.itemContainer}>
          <View style={styles.icon}>
            <Ionicons name={"bed"} size={50} />
          </View>
          <Text style={styles.miniText}>Sofa</Text>
        </View>

        <View style={styles.itemContainer}>
          <View style={styles.icon}>
            <Ionicons name={"bed"} size={50} />
          </View>
          <Text style={styles.miniText}>Sofa</Text>
        </View>

        <View style={styles.itemContainer}>
          <View style={styles.icon}>
            <Ionicons name={"bed"} size={50} />
          </View>
          <Text style={styles.miniText}>Sofa</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  //   BC: {
  //     flex: 1,
  //     backgroundColor: "#BAC3C3",
  //   },
  //   container: {
  //     marginTop: StatusBar.currentHeight,
  //     paddingLeft: 20,
  //     marginRight: 20,
  //   },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    padding: 10,
  },
  itemContainer: {
    alignItems: "center",
    marginHorizontal: 10,
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
