import { useContext, useState } from "react";
import { Layout, StyleService, Toggle } from "@ui-kitten/components";

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
      <Toggle checked={checked} onChange={onCheckedChange}>
        {`Dark Mode: ${checked}`}
      </Toggle>
    </Layout>
  );
};

const styles = StyleService.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});
