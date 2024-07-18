// Import thư viện React
import React from "react";
// Import các thành phần cần thiết từ thư viện React
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../src/firebase/Config";

// Định nghĩa một hàm chức năng có tên là ProfileScreen và xuất mặc định hàm này ra ngoài
export default function ProfileScreen({ navigation, route }) {
  const auth = getAuth(app);

  const handleLogout = () => {
    Alert.alert(
      "Log out",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Logout cancelled"),
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            auth
              .signOut()
              .then(() => {
                console.log("Logged out");
                // navigation.replace("LoginScreen"); // Navigate to login screen or any other screen after logging out
              })
              .catch((error) => {
                console.error("Error logging out: ", error);
              });
          },
        },
      ],
      { cancelable: true }
    );
  };

  // Trả về giao diện của thành phần ProfileScreen
  return (
    <View style={styles.container}>
      <Text style={styles.itemTextWelcome}>Welcome Jenny !</Text>

      {/* Sử dụng View để tạo lưới chứa các nút */}
      <View style={styles.gridContainer}>
        {/* Tạo các nút bằng TouchableOpacity và thêm biểu tượng bằng Image */}

        {/* Nút Update deliverry */}
        <TouchableOpacity
          onPress={() => navigation.navigate("UpdateDelivery")}
          style={styles.gridItem}
        >
          <Image
            source={require("../assets/update_dilivery.png")}
            style={styles.icon}
          />
          <Text style={styles.itemText}>Update dilivery address</Text>
        </TouchableOpacity>

        {/* Nút View personal information */}
        <TouchableOpacity
          onPress={() => navigation.navigate("PersonalInformationScreen")}
          style={styles.gridItem}
        >
          <Image
            source={require("../assets/view_person_information.png")}
            style={styles.icon}
          />
          <Text style={styles.itemText}>View personal information</Text>
        </TouchableOpacity>

        {/* Nút View Order Management */}
        <TouchableOpacity
          style={styles.gridItem}
          onPress={() => navigation.navigate("PurchaseHistory")}
        >
          <Image
            source={require("../assets/order_management.png")}
            style={styles.icon}
          />
          <Text style={styles.itemText}>Order{"\n"}management</Text>
        </TouchableOpacity>

        {/* Nút Customer support */}
        <TouchableOpacity style={styles.gridItem}>
          <Image
            source={require("../assets/customer_support.png")}
            style={styles.icon}
          />
          <Text style={styles.itemText}>Customer{"\n"} support</Text>
        </TouchableOpacity>

        {/* Nút Log out */}
        <TouchableOpacity
          style={styles.gridItem}
          // onPress={() => {
          //   auth.signOut().then(() => {
          //     console.log("logged out");
          //   });
          // }}
          onPress={handleLogout}
        >
          <Image
            source={require("../assets/log_out.png")}
            style={styles.icon}
          />
          <Text style={styles.itemText}>Log out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Định nghĩa các kiểu dáng cho các thành phầ
const styles = StyleSheet.create({
  container: {
    // Áp dụng cho view bự chứa các nút
    flex: 1, // Cho phép View container chiếm toàn bộ không gian của màn hình
    padding: 16, // Thêm khoảng cách bên trong (padding) xung quanh nội dung của container
    backgroundColor: "#b9c3c4", // Thiết lập màu nền cho container.
    marginTop: StatusBar.currentHeight,
  },
  gridContainer: {
    // Áp dụng cho view mỗi nút
    flexDirection: "row", // Sắp xếp các phần tử con của gridCongtainer theo chiều ngang
    flexWrap: "wrap", // Cho phép các phần tử con tự động di chuyển xuống hàng mới nếu không đủ trong 1 hàng
    justifyContent: "space-between", // Căn các phần tử con đều nhau theo chiều ngang
  },
  gridItem: {
    // Áp dụng cho <TouchableOpacity style={styles.gridItem}> (nút)
    flexDirection: "column", // Sắp xếp các phần tử con của gridItem theo cột dọc
    alignItems: "center", // Căn giữa các phần tử con theo chiều ngang
    justifyContent: "center", // Căn giữa các phần tử con theo chiều dọc
    backgroundColor: "#b2ff59", // Thiết lập màu nền cho gridItem
    borderRadius: 10, // Thiết lập góc bo tròn cho gridItem
    // padding: 20, // Thêm khoảng cách bên trong (padding) cho gridItem
    // margin: 10, // Thêm khoảng cách bên ngoài (margin) cho gridItem
    //marginHorizontal: 16,
    marginVertical: 6,
    width: "48%", // Thiết lập chiều rộng cho gridItem
    height: 120, // Thiết lập chiều cao cho gridItem
    elevation: 5, // Thêm hiệu ứng bóng trên Android cho gridItem
    backgroundColor: "white",
  },
  icon: {
    //Áp dụng cho icon trong mỗi nút
    width: 50, // Thiết lập chiều rộng
    height: 50, // Thiết lập chiều ngang
  },
  itemText: {
    // Áp dụng cho <Text style={styles.itemText}>
    textAlign: "center", // Căn giữa văn bản theo chiều ngang
    fontSize: 18, // Thiết lập kích thước chữ cho văn bản
    fontWeight: "bold", // Thiết lập chữ đậm cho văn bản
  },

  // Kiểu dáng cho văn bản của nút
  itemTextWelcome: {
    // textAlign: 'center', // Căn giữa văn bản theo chiều ngang
    fontSize: 24, // Thiết lập kích thước chữ cho văn bản
    fontWeight: "bold", // Thiết lập chữ đậm cho văn bản
  },
});
