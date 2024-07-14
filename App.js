import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from "@expo/vector-icons/Ionicons";
import HomeScreen from "./screens/HomeScreen";
import LikeScreen from "./screens/LikeScreen";
import BagScreen from "./screens/BagScreen";
import ProfileScreen from "./screens/ProfileScreen";
import SignInScreen from "./screens/SignInScreen";
import SignUpScreen from "./screens/SignUpScreen";
import ForgotPassword from "./screens/ForgotPassword";

import { HomeStack } from "./navigations/StackApp";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelPosition: "below-icon",
        tabBarActiveTintColor: "green",
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name={"home"} size={20} color={color} />
          ),
          tabBarBadge: 3,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Like"
        component={LikeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name={"heart"} size={20} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={BagScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name={"bag"} size={20} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name={"person"} size={20} color={color} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen
          name="SignIn"
          component={SignInScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUpScreen"
          component={SignUpScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
