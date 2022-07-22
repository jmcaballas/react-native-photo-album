import { useContext, useState } from "react";
import { Layout, StyleService, Toggle } from "@ui-kitten/components";
import { StatusBar } from "expo-status-bar";

import { ThemeContext } from "../context/ThemeContext";

export const SettingsScreen = () => {
  const [checked, setChecked] = useState(false);
  const themeContext = useContext(ThemeContext);

  const onCheckedChange = (isChecked: boolean) => {
    setChecked(isChecked);
    themeContext.toggleTheme();
  };

  return (
    <Layout style={styles.container}>
      <Layout style={styles.toggleContainer}>
        <Toggle checked={checked} onChange={onCheckedChange}>
          {`Dark Mode: ${checked}`}
        </Toggle>
      </Layout>
      {themeContext.theme === "dark" ? (
        <StatusBar style="light" />
      ) : (
        <StatusBar style="dark" />
      )}
    </Layout>
  );
};

const styles = StyleService.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  toggleContainer: {
    marginTop: 20,
  },
});
