// Import thư viện React
import React from "react";
// Import các thành phần cần thiết từ thư viện React
import { View, Text, StyleSheet, TouchableOpacity, Image, StatusBar } from "react-native";

// Định nghĩa một hàm chức năng có tên là ProfileScreen và xuất mặc định hàm này ra ngoài
export default function ProfileScreen({ navigation, route }) {
  // Trả về giao diện của thành phần ProfileScreen
  return (
    <View style={styles.container}>
      
      <Text style={styles.itemTextWelcome}>Welcome Jenny !</Text>

      {/* Sử dụng View để tạo lưới chứa các nút */}
      <View style={styles.gridContainer}>
        {/* Tạo các nút bằng TouchableOpacity và thêm biểu tượng bằng Image */}
        {/* Nút Update deliverry */}

        <TouchableOpacity style={styles.gridItem}>
          <Image source={require('../assets/update_dilivery.png')} style={styles.icon} />
          <Text style={styles.itemText}>Update dilivery address</Text>
        </TouchableOpacity>

        {/* Nút View personal information */}
        <TouchableOpacity style={styles.gridItem}>
          <Image source={require('../assets/view_person_information.png')} style={styles.icon} />
          <Text style={styles.itemText}>VIEW PERSON information</Text>
        </TouchableOpacity>

        {/* Nút View personal information */}
        <TouchableOpacity style={styles.gridItem}>
          <Image source={require('../assets/view_person_information.png')} style={styles.icon}/>
          <Text style={styles.itemText}>VIEW PERSON information</Text>
        </TouchableOpacity>

        {/* Nút View personal information */}
        <TouchableOpacity style={styles.gridItem}>
          <Image source={require('../assets/view_person_information.png')} style={styles.icon} />
          <Text style={styles.itemText}>VIEW PERSON information</Text>
        </TouchableOpacity>

        {/* Nút View personal information */}
        <TouchableOpacity style={styles.gridItem}>
          <Image source={require('../assets/view_person_information.png')} style={styles.icon} />
          <Text style={styles.itemText}>VIEW PERSON information</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

// Định nghĩa các kiểu dáng cho các thành phầ
const styles = StyleSheet.create({
  container:{ // Áp dụng cho view bự chứa các nút
    flex: 1, // Cho phép View container chiếm toàn bộ không gian của màn hình
    padding: 16, // Thêm khoảng cách bên trong (padding) xung quanh nội dung của container
    backgroundColor: "#e0e0e0", // Thiết lập màu nền cho container.
    marginTop: StatusBar.currentHeight,
  },
  gridContainer:{ // Áp dụng cho view mỗi nút
    flexDirection: "row", // Sắp xếp các phần tử con của gridCongtainer theo chiều ngang
    flexWrap: "wrap", // Cho phép các phần tử con tự động di chuyển xuống hàng mới nếu không đủ trong 1 hàng
    justifyContent: "space-between", // Căn các phần tử con đều nhau theo chiều ngang
    backgroundColor: 'red'
  },
  gridItem: { // Áp dụng cho <TouchableOpacity style={styles.gridItem}> (nút)
  flexDirection: 'column', // Sắp xếp các phần tử con của gridItem theo cột dọc
  alignItems: 'center', // Căn giữa các phần tử con theo chiều ngang
  justifyContent: 'center', // Căn giữa các phần tử con theo chiều dọc
  backgroundColor: '#b2ff59', // Thiết lập màu nền cho gridItem
  borderRadius: 10, // Thiết lập góc bo tròn cho gridItem
 // padding: 20, // Thêm khoảng cách bên trong (padding) cho gridItem
  // margin: 10, // Thêm khoảng cách bên ngoài (margin) cho gridItem
  marginHorizontal: 16,
  marginVertical: 10,
  width: '40%', // Thiết lập chiều rộng cho gridItem
  height: 120, // Thiết lập chiều cao cho gridItem
  elevation: 5, // Thêm hiệu ứng bóng trên Android cho gridItem
  backgroundColor: 'white'
},
icon:{ //Áp dụng cho icon trong mỗi nút
  width: 50, // Thiết lập chiều rộng
  height: 50, // Thiết lập chiều ngang
},
itemText: { // Áp dụng cho <Text style={styles.itemText}>
  textAlign: 'center', // Căn giữa văn bản theo chiều ngang
  fontSize: 14, // Thiết lập kích thước chữ cho văn bản
  fontWeight: 'bold', // Thiết lập chữ đậm cho văn bản
},

// Kiểu dáng cho văn bản của nút
itemTextWelcome: {
 // textAlign: 'center', // Căn giữa văn bản theo chiều ngang
  fontSize: 24, // Thiết lập kích thước chữ cho văn bản
  fontWeight: 'bold', // Thiết lập chữ đậm cho văn bản
},
});
