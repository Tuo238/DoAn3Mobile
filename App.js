import React from "react";
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
import SearchScreen from "./screens/SearchScreen";
import ForgotPassword from "./screens/ForgotPassword";
import PurchaseHistoryScreen from "./screens/PurchaseHistoryScreen";
import { HomeStack } from "./navigations/StackApp";
import { AuthProvider, useAuth } from "./components/AuthContext";
import { ActivityIndicator, View } from "react-native";
import registerNNPushToken from "native-notify";

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
          // tabBarBadge: 3,
          headerShown: false,
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

function AppNavigator() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack.Navigator initialRouteName={user ? "Main" : "SignIn"}>
      {user ? (
        <>
          <Stack.Screen
            name="Main"
            component={TabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PurchaseHistoryScreen"
            component={PurchaseHistoryScreen}
            options={{ headerShown: false }}
          />
        </>
      ) : (
        <>
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
        </>
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  registerNNPushToken(22539, "b1dYAiw1pXlhTFpBtohH34");
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}
