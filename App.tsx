import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ApplicationProvider } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import { MaterialIcons } from "@expo/vector-icons";

import { HomeScreen } from "./components/HomeScreen";
import { PhotoDetailScreen } from "./components/PhotoDetailScreen";
import { SettingsScreen } from "./components/SettingsScreen";
import { ThemeContext } from "./context/ThemeContext";

const Stack = createNativeStackNavigator();

export default function App() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <ApplicationProvider {...eva} theme={eva[theme as "light" | "dark"]}>
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
                    color={theme === "dark" ? "#FFFFFF" : "#222B45"}
                    onPress={() => navigation.navigate("Settings")}
                  />
                ),
                headerStyle: {
                  backgroundColor: theme === "light" ? "#FFFFFF" : "#222B45",
                },
                headerTintColor: theme === "light" ? "#222B45" : "#FFFFFF",
              })}
            />
            <Stack.Screen
              name="Photo Detail"
              component={PhotoDetailScreen}
              options={{
                headerStyle: {
                  backgroundColor: theme === "light" ? "#FFFFFF" : "#222B45",
                },
                headerTintColor: theme === "light" ? "#222B45" : "#FFFFFF",
              }}
            />
            <Stack.Screen
              name="Settings"
              component={SettingsScreen}
              options={{
                headerStyle: {
                  backgroundColor: theme === "light" ? "#FFFFFF" : "#222B45",
                },
                headerTintColor: theme === "light" ? "#222B45" : "#FFFFFF",
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ApplicationProvider>
    </ThemeContext.Provider>
  );
}
