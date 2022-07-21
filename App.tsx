import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ApplicationProvider } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import { MaterialIcons } from "@expo/vector-icons";

import { HomeScreen } from "./components/HomeScreen";
import { PhotoDetailScreen } from "./components/PhotoDetailScreen";
import { SettingsScreen } from "./components/SettingsScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={({ navigation }) => ({
              headerRight: () => (
                <MaterialIcons
                  name="settings"
                  size={24}
                  color="black"
                  onPress={() => navigation.navigate("Settings")}
                />
              ),
            })}
          />
          <Stack.Screen name="Photo Detail" component={PhotoDetailScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApplicationProvider>
  );
}
