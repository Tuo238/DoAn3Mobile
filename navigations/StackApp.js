import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import ProductDetails from "../screens/ProductDetails";
import CategorizedProduct from "../screens/CategorizedProductScreen";
import TestStack from "../screens/TestStack";
import PurchaseHistoryScreen from "../screens/PurchaseHistoryScreen";
import PersonalInformationScreen from "../screens/PersonalInformationScreen";
import UpdateProfile from "../screens/UpdateProfile";
import SearchScreen from "../screens/SearchScreen";
import BagScreen from "../screens/BagScreen";
import UpdateDelivery from "../screens/UpdateDelivery";

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
      <Stack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="PurchaseHistory"
        component={PurchaseHistoryScreen}
        // options={{
        //  // title: "Purchase History",
        //   headerStyle: { backgroundColor: "#BAC3C3" },
        // }}
      />
      <Stack.Screen
        name="PersonalInformationScreen"
        component={PersonalInformationScreen}
        options={{
          title: "Personal Information",
          headerStyle: { backgroundColor: "#BAC3C3" },
        }}
      />

      <Stack.Screen
        name="UpdateProfile"
        component={UpdateProfile}
        options={{
          title: "Update Information",
          headerStyle: { backgroundColor: "#BAC3C3" },
        }}
      />

      <Stack.Screen
        name="BagScreen"
        component={BagScreen}
        initialParams={{ userId: "your_user_id_here" }}
        options={{
          title: "",
          headerStyle: { backgroundColor: "#BAC3C3" },
        }}
      />

      <Stack.Screen
        name="UpdateDelivery"
        component={UpdateDelivery}
        options={{
          title: "",
          headerStyle: { backgroundColor: "#BAC3C3" },
        }}
      />
    </Stack.Navigator>
  );
}
