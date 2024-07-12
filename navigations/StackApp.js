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
