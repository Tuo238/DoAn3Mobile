import firebaseConfig from '../../src/firebase/Config.js';
const { db } = firebaseConfig;
import { collection, addDoc } from 'firebase/firestore';

// Dữ liệu của 2 sản phẩm mới
const newProducts = [
  {
    name: "Sản phẩm mới 1",
    description: "Mô tả sản phẩm mới 1",
    price: 200,
    category: "category_id_1",
    images: [
      "https://firebasestorage.googleapis.com/v0/b/doan3mobile.appspot.com/o/image1.jpg?alt=media&token=token1"
    ],
    stock: 20,
    reviews: []
  },
  {
    name: "Sản phẩm mới 2",
    description: "Mô tả sản phẩm mới 2",
    price: 300,
    category: "category_id_2",
    images: [
      "https://firebasestorage.googleapis.com/v0/b/doan3mobile.appspot.com/o/image2.jpg?alt=media&token=token2"
    ],
    stock: 15,
    reviews: []
  }
];

// Hàm để thêm sản phẩm vào Firestore
const addNewProductsToFirestore = async (products) => {
  const productsRef = collection(db, 'products');

  try {
    for (const product of products) {
      await addDoc(productsRef, product);
    }
    console.log('New products added successfully!');
  } catch (error) {
    console.error('Error adding new products: ', error);
  }
};

// Gọi hàm và truyền dữ liệu sản phẩm mới
addNewProductsToFirestore(newProducts);
