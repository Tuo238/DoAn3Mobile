// Import các thành phần cần thiết từ React và React Native
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  ScrollView,
  FlatList,
} from "react-native";

// Khai báo hàm chức năng chính của màn hình PurchaseHistoryScreen
export default function PurchaseHistoryScreen({ navigation, route }) {
  // Khai báo state selectedStatus và hàm setSelectedStatus để cập nhật trạng thái
  const [selectedStatus, setSelectedStatus] = useState("Processing");

  // Khai báo dữ liệu mẫu cho danh sách các đơn hàng
  const data = [
    {
      id: "1", // ID duy nhất của mục
      store: "Reebok", // Tên cửa hàng
      product: "Reebok Turbo Restyle Unisex Sports Shoes", // Tên sản phẩm
      quantity: "x1", // Số lượng
      price: "47.2$", // Giá
      status: "Waiting for the store to process", // Trạng thái đơn hàng
      payMethod: "Cash", // Phương thức thanh toán
      image: require("../assets/customer_support.png"), // Đường dẫn tới hình ảnh sản phẩm
    },
    {
      id: "2", // ID duy nhất của mục
      store: "Akko", // Tên cửa hàng
      product: "Keyboard AKKO 3108 Dragon Ball Z - Goku (Akko Pink sw)", // Tên sản phẩm
      quantity: "x1", // Số lượng
      price: "66.75$", // Giá
      status: "Waiting for the store to process", // Trạng thái đơn hàng
      payMethod: "Bank transfer", // Phương thức thanh toán
      image: require("../assets/customer_support.png"), // Đường dẫn tới hình ảnh sản phẩm
    },
    {
      id: "3", // ID duy nhất của mục
      store: "Akko", // Tên cửa hàng
      product: "Keyboard AKKO 3108 Dragon Ball Z - Goku (Akko Pink sw)", // Tên sản phẩm
      quantity: "x1", // Số lượng
      price: "66.75$", // Giá
      status: "Waiting for the store to process", // Trạng thái đơn hàng
      payMethod: "Bank transfer", // Phương thức thanh toán
      image: require("../assets/customer_support.png"), // Đường dẫn tới hình ảnh sản phẩm
    },
    // Thêm các mục khác nếu cần
  ];

  return (
    // Thành phần chứa chính của màn hình, thiết lập các kiểu dáng từ styles.container
    <View style={styles.container}>
      {/* Thiết lập thanh trạng thái */}
      <StatusBar barStyle="dark-content" />
      {/* Hiển thị tiêu đề */}
      <Text style={styles.title}>PURCHASE HISTORY</Text>

      {/* Thanh cuộn ngang để chọn trạng thái đơn hàng */}
      <ScrollView
        horizontal
        style={styles.scrollContainer}
        showsHorizontalScrollIndicator={false}
      >
        {/* Nút chọn trạng thái 'Processing' */}
        <TouchableOpacity onPress={() => setSelectedStatus("Processing")}>
          <Text
            style={[
              styles.statusText,
              selectedStatus === "Processing" && styles.selectedStatus,
            ]}
          >
            Processing
          </Text>
        </TouchableOpacity>
        {/* Nút chọn trạng thái 'Delivering' */}
        <TouchableOpacity onPress={() => setSelectedStatus("Delivering")}>
          <Text
            style={[
              styles.statusText,
              selectedStatus === "Delivering" && styles.selectedStatus,
            ]}
          >
            Delivering
          </Text>
        </TouchableOpacity>
        {/* Nút chọn trạng thái 'Delivered' */}
        <TouchableOpacity onPress={() => setSelectedStatus("Delivered")}>
          <Text
            style={[
              styles.statusText,
              selectedStatus === "Delivered" && styles.selectedStatus,
            ]}
          >
            Delivered
          </Text>
        </TouchableOpacity>
        {/* Nút chọn trạng thái 'Cancelled/Delivery failed' */}
        <TouchableOpacity
          onPress={() => setSelectedStatus("Cancelled/Delivery failed")}
        >
          <Text
            style={[
              styles.statusText,
              selectedStatus === "Cancelled/Delivery failed" &&
                styles.selectedStatus,
            ]}
          >
            Cancelled/Delivery failed
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Danh sách các đơn hàng */}
      <FlatList
        data={data} // Dữ liệu nguồn
        keyExtractor={(item) => item.id} // Khóa duy nhất cho mỗi mục
        renderItem={({ item }) => (
          // Thành phần hiển thị từng mục trong danh sách
          <View style={styles.listItem}>
            {/* Hình ảnh sản phẩm */}
            <Image source={item.image} style={styles.productImage} />
            <View style={styles.itemDetails}>
              <View style={styles.storeRow}>
                {/* Biểu tượng cửa hàng */}
                <Image
                  source={require("../assets/icon_store.png")}
                  style={styles.storeIcon}
                />
                {/* Tên cửa hàng */}
                <Text style={styles.storeName}>{item.store}</Text>
              </View>
              {/* Tên sản phẩm và số lượng */}
              <Text>
                {item.product} {item.quantity}
              </Text>
              {/* Tổng giá */}
              <Text style={styles.price}>
                Total: <Text style={styles.priceValue}>{item.price}</Text>
              </Text>
              {/* Trạng thái đơn hàng */}
              <Text style={styles.status}>{item.status}</Text>
              {/* Phương thức thanh toán */}
              <Text style={styles.payMethod}>Pay method: {item.payMethod}</Text>
              {/* Nút hủy đơn hàng, chỉ hiển thị khi trạng thái không phải là 'Delivering' */}
              {selectedStatus !== "Delivering" && (
                <TouchableOpacity style={styles.cancelButton}>
                  <Text style={styles.cancelButtonText}>Cancel order</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
      />
    </View>
  );
}

// Khai báo các kiểu dáng cho các thành phần
const styles = StyleSheet.create({
  container: {
    flex: 1, // Chiếm toàn bộ không gian
    backgroundColor: "#fff", // Màu nền trắng
    paddingTop: StatusBar.currentHeight, // Khoảng cách đệm từ đầu màn hình đến thanh trạng thái
  },
  title: {
    fontSize: 24, // Kích thước chữ
    fontWeight: "bold", // Độ đậm của chữ
    textAlign: "center", // Canh giữa
    marginVertical: 20, // Khoảng cách trên và dưới
  },
  scrollContainer: {
    flexDirection: "row", // Hiển thị các thành phần theo hàng ngang
    marginVertical: 10, // Khoảng cách trên và dưới
  },
  statusText: {
    fontSize: 16, // Kích thước chữ
    fontWeight: "bold", // Độ đậm của chữ
    marginHorizontal: 15, // Khoảng cách hai bên
    color: "black", // Màu chữ
  },
  selectedStatus: {
    fontWeight: "bold", // Độ đậm của chữ
    color: "green", // Màu chữ khi được chọn
    textDecorationLine: "underline", // Gạch chân chữ
  },
  listItem: {
    flexDirection: "row", // Hiển thị các thành phần theo hàng ngang
    padding: 10, // Khoảng cách bên trong
    marginVertical: 5, // Khoảng cách trên và dưới
    marginHorizontal: 10, // Khoảng cách hai bên
    backgroundColor: "#f8f8f8", // Màu nền
    borderRadius: 5, // Bo tròn góc
    elevation: 2, // Độ nổi của thành phần
  },
  productImage: {
    width: 80, // Chiều rộng hình ảnh
    height: 80, // Chiều cao hình ảnh
    marginRight: 10, // Khoảng cách phải
  },
  itemDetails: {
    flex: 1, // Chiếm toàn bộ không gian còn lại
  },
  storeRow: {
    flexDirection: "row", // Hiển thị các thành phần theo hàng ngang
    alignItems: "center", // Canh giữa theo chiều dọc
  },
  storeIcon: {
    width: 20, // Chiều rộng biểu tượng
    height: 20, // Chiều cao biểu tượng
    marginRight: 5, // Khoảng cách phải
  },
  storeName: {
    fontWeight: "bold", // Độ đậm của chữ
    fontSize: 16, // Kích thước chữ
  },
  price: {
    fontSize: 14, // Kích thước chữ
    fontWeight: "bold", // Độ đậm của chữ
    marginTop: 5, // Khoảng cách trên
  },
  priceValue: {
    fontSize: 14, // Kích thước chữ
    fontWeight: "bold", // Độ đậm của chữ
    color: "#ff4081", // Màu hồng đậm như nút "Cancel order"
  },
  status: {
    fontSize: 12, // Kích thước chữ
    color: "#777", // Màu chữ
    marginTop: 5, // Khoảng cách trên
  },
  payMethod: {
    fontSize: 12, // Kích thước chữ
    color: "#777", // Màu chữ
  },
  cancelButton: {
    backgroundColor: "#ff4081", // Màu nền nút hủy đơn
    borderRadius: 5, // Bo tròn góc
    paddingVertical: 5, // Khoảng cách bên trong theo chiều dọc
    paddingHorizontal: 10, // Khoảng cách bên trong theo chiều ngang
    alignSelf: "flex-start", // Canh đầu
    marginTop: 10, // Khoảng cách trên
  },
  cancelButtonText: {
    color: "#fff", // Màu chữ
  },
});
