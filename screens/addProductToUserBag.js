import { getFirestore, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { app } from "../src/firebase/Config"; // Đường dẫn đến file cấu hình Firebase

export const addProductToUserBag = async (userId, productId, quantity) => {
  const firestore = getFirestore(app); // Khởi tạo Firestore với ứng dụng Firebase của bạn

  try {
    const userRef = doc(firestore, "users", userId);

    await updateDoc(userRef, {
      productIds: arrayUnion({ productId, quantity }),
    });

    console.log("Product ID added to user successfully");
    return { success: true };
  } catch (error) {
    console.error("Error adding product ID to user: ", error);
    return { success: false, error };
  }
};
