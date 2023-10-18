import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/pages/Home";
import { Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
const title = (text) =>
  Platform.select({ web: `Coin Checker | ${text}`, default: text });

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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MyStack;
