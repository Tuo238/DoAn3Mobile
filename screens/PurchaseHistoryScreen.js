// Import thư viện React
import React, { useState } from "react";

// Import các thành phần cần thiết từ thư viện React Native
import { View, Text, StyleSheet, TouchableOpacity, Image, StatusBar, ScrollView, FlatList } from "react-native";

// Định nghĩa một hàm chức năng có tên là PurchaseHistoryScreen và xuất mặc định hàm này ra ngoài
export default function PurchaseHistoryScreen({ navigation, route }) {
  // Sử dụng hook useState để lưu trữ trạng thái của mục đang được chọn, mặc định là 'Processing'
  const [selectedStatus, setSelectedStatus] = useState('Processing');

  // Dữ liệu mẫu cho danh sách đơn hàng
  const data = [
    {
      id: '1',
      store: 'School supplies store', // Tên cửa hàng
      product: 'Children\'s tables and chairs', // Sản phẩm
      quantity: 'x1', // Số lượng
      price: '5$', // Giá
      status: 'Successful delivery', // Trạng thái đơn hàng
      payMethod: 'Cash', // Phương thức thanh toán
      image: require('../assets/customer_support.png'), // Đường dẫn tới hình ảnh sản phẩm
    },
    {
      id: '2',
      store: 'Mandinni Store', // Tên cửa hàng
      product: 'Men\'s polo shirt', // Sản phẩm
      quantity: 'x2', // Số lượng
      price: '8$', // Giá
      status: 'Successful delivery', // Trạng thái đơn hàng
      payMethod: 'Bank transfer', // Phương thức thanh toán
      image: require('../assets/ban_ghe.png'), // Đường dẫn tới hình ảnh sản phẩm
    },
    {
        id: '3',
        store: 'Mandinni Store', // Tên cửa hàng
        product: 'Men\'s polo shirt', // Sản phẩm
        quantity: 'x2', // Số lượng
        price: '8$', // Giá
        status: 'Successful delivery', // Trạng thái đơn hàng
        payMethod: 'Bank transfer', // Phương thức thanh toán
        image: require('../assets/customer_support.png'), // Đường dẫn tới hình ảnh sản phẩm
      },
    // Thêm các mục khác nếu cần
  ];

  // Trả về giao diện của thành phần PurchaseHistoryScreen
  return (
    <View style={styles.container}>
      {/* Thiết lập kiểu hiển thị của thanh trạng thái (StatusBar) */}
      <StatusBar barStyle="dark-content" />
      {/* Hiển thị tiêu đề của màn hình */}
      <Text style={styles.title}>Purchase History</Text>
      
      {/* ScrollView cho phép cuộn ngang các mục trạng thái */}
      <ScrollView horizontal style={styles.scrollContainer} showsHorizontalScrollIndicator={false}>
        {/* Mục trạng thái 'Processing' */}
        <TouchableOpacity onPress={() => setSelectedStatus('Processing')}>
          {/* Áp dụng kiểu cho văn bản, bao gồm cả kiểu được chọn nếu 'Processing' đang được chọn */}
          <Text style={[styles.statusText, selectedStatus === 'Processing' && styles.selectedStatus]}>Processing</Text>
        </TouchableOpacity>
        {/* Mục trạng thái 'Delivering' */}
        <TouchableOpacity onPress={() => setSelectedStatus('Delivering')}>
          {/* Áp dụng kiểu cho văn bản, bao gồm cả kiểu được chọn nếu 'Delivering' đang được chọn */}
          <Text style={[styles.statusText, selectedStatus === 'Delivering' && styles.selectedStatus]}>Delivering</Text>
        </TouchableOpacity>
        {/* Mục trạng thái 'Delivered' */}
        <TouchableOpacity onPress={() => setSelectedStatus('Delivered')}>
          {/* Áp dụng kiểu cho văn bản, bao gồm cả kiểu được chọn nếu 'Delivered' đang được chọn */}
          <Text style={[styles.statusText, selectedStatus === 'Delivered' && styles.selectedStatus]}>Delivered</Text>
        </TouchableOpacity>
        {/* Mục trạng thái 'Cancelled/Delivery failed' */}
        <TouchableOpacity onPress={() => setSelectedStatus('Cancelled/Delivery failed')}>
          {/* Áp dụng kiểu cho văn bản, bao gồm cả kiểu được chọn nếu 'Cancelled/Delivery failed' đang được chọn */}
          <Text style={[styles.statusText, selectedStatus === 'Cancelled/Delivery failed' && styles.selectedStatus]}>Cancelled/Delivery failed</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* FlatList để hiển thị danh sách đơn hàng */}
      <FlatList
        data={data} // Dữ liệu đầu vào của FlatList
        keyExtractor={item => item.id} // Khóa để xác định mỗi mục
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Image source={item.image} style={styles.productImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.storeName}>{item.store}</Text>
              <Text>{item.product} {item.quantity}</Text>
              <Text>Total: {item.price}</Text>
              <Text>{item.status}</Text>
              <Text>Pay method: {item.payMethod}</Text>
              <TouchableOpacity style={styles.evaluateButton}>
                <Text style={styles.evaluateText}>Evaluate</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

// Định nghĩa các kiểu dáng cho thành phần sử dụng StyleSheet
const styles = StyleSheet.create({
  container: { // Kiểu cho container chính của màn hình
    flex: 1, // Chiếm toàn bộ không gian của màn hình
    backgroundColor: "#fff", // Màu nền trắng
    paddingTop: StatusBar.currentHeight, // Đệm phía trên để tránh chồng lên thanh trạng thái
  },
  title: { // Kiểu cho tiêu đề của màn hình
    fontSize: 24, // Kích thước chữ 24
    fontWeight: "bold", // Chữ đậm
    textAlign: 'center', // Căn giữa
    marginVertical: 20, // Khoảng cách trên dưới 20
  },
  scrollContainer: { // Kiểu cho ScrollView chứa các mục trạng thái
    flexDirection: 'row', // Sắp xếp các mục theo chiều ngang
    marginVertical: 10, // Khoảng cách trên dưới 10
  },
  statusText: { // Kiểu cho văn bản của các mục trạng thái
    fontSize: 16, // Kích thước chữ 16
    fontWeight: "bold", // Chữ đậm
    marginHorizontal: 15, // Khoảng cách hai bên 15
    color: 'black', // Màu chữ đen
  },
  selectedStatus: { // Kiểu cho văn bản của mục trạng thái đang được chọn
    fontWeight: 'bold', // Chữ đậm
    color: 'green', // Màu chữ xanh
    textDecorationLine: 'underline', // Gạch chân văn bản
  },
  listItem: { // Kiểu cho mỗi mục trong danh sách đơn hàng
    flexDirection: 'row', // Sắp xếp các mục theo chiều ngang
    padding: 10, // Đệm trong 10
    marginVertical: 5, // Khoảng cách trên dưới 5
    marginHorizontal: 10, // Khoảng cách hai bên 10
    backgroundColor: '#f8f8f8', // Màu nền xám nhạt
    borderRadius: 5, // Bo tròn góc 5
    elevation: 2, // Hiệu ứng đổ bóng trên Android
  },
  productImage: { // Kiểu cho hình ảnh sản phẩm
    width: 80, // Chiều rộng 80
    height: 80, // Chiều cao 80
    marginRight: 10, // Khoảng cách bên phải 10
  },
  itemDetails: { // Kiểu cho chi tiết sản phẩm
    flex: 1, // Chiếm toàn bộ không gian còn lại
  },
  storeName: { // Kiểu cho tên cửa hàng
    fontWeight: 'bold', // Chữ đậm
    fontSize: 16, // Kích thước chữ 16
  },
  evaluateButton: { // Kiểu cho nút "Evaluate"
    backgroundColor: '#ff4081', // Màu nền hồng đậm
    borderRadius: 5, // Bo tròn góc 5
    paddingVertical: 5, // Đệm trên dưới 5
    paddingHorizontal: 10, // Đệm hai bên 10
    alignSelf: 'flex-start', // Căn trái
    marginTop: 5, // Khoảng cách trên 5
  },
  evaluateText: { // Kiểu cho văn bản bên trong nút "Evaluate"
    color: '#fff', // Màu chữ trắng
  },
});
