import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import { Details } from "../screens/Details";

const stack = createNativeStackNavigator();

export function MainNavigator() {
    return (
        <stack.Navigator>
            <stack.Screen name="Home" component={Home} />
            <stack.Screen name="Details" component={Details} />

        </stack.Navigator>
    );
}