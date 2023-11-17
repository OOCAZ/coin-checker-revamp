import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/pages/Home";
import Compare from "./src/pages/Compare";
import { Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
const title = (text) => Platform.select({ web: `Coin Checker`, default: text });

const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: title("Coin Checker"), headerShown: false }}
        />
        <Stack.Screen
          name="Compare"
          component={Compare}
          options={{ title: title("Coin Checker Compare"), headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MyStack;
