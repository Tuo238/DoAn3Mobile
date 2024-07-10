// import { Pressable, Text } from "react-native";
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import TestStack from "../screens/TestStack";
// import HomeScreen from "../screens/HomeScreen";
// import ProductDetails from "../screens/ProductDetails";
// import CategorizedProduct from "../screens/CategorizedProductScreen";
// import Signin from "../screens/SignInScreen";

// const Stack = createNativeStackNavigator();

// export function HomeStack() {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen
//         name="HomeStack"
//         component={HomeScreen}
//         options={() => ({
//           headerShown: false,
//         })}
//       />
//       <Stack.Screen name="TestStack" component={TestStack} />
//       <Stack.Screen
//         name="ProductDetails"
//         component={ProductDetails}
//         options={() => ({
//           title: "",
//           headerStyle: {
//             backgroundColor: "#BAC3C3",
//           },
//         })}
//       />
//       <Stack.Screen
//         name="CategorizedProduct"
//         component={CategorizedProduct}
//         options={() => ({
//           title: "Home",
//           headerStyle: {
//             backgroundColor: "#BAC3C3",
//           },
//         })}
//       />
//       <Stack.Screen
//         name="Signin"
//         component={Signin}
//         options={() => ({
//           headerShown: false,
//         })}
//       />
//     </Stack.Navigator>
//   );
// }

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import ProductDetails from "../screens/ProductDetails";
import CategorizedProduct from "../screens/CategorizedProductScreen";
import TestStack from "../screens/TestStack";

const Stack = createNativeStackNavigator();

export function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeStack"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="TestStack" component={TestStack} />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetails}
        options={{
          title: "",
          headerStyle: { backgroundColor: "#BAC3C3" },
        }}
      />
      <Stack.Screen
        name="CategorizedProduct"
        component={CategorizedProduct}
        options={{
          title: "Home",
          headerStyle: { backgroundColor: "#BAC3C3" },
        }}
      />
    </Stack.Navigator>
  );
}
