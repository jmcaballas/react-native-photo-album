import { useContext } from "react";
import { Image } from "react-native";
import { Layout, StyleService, Text } from "@ui-kitten/components";
import { StatusBar } from "expo-status-bar";

import { ThemeContext } from "../context/ThemeContext";

export const PhotoDetailScreen = ({ route }: { route: any }) => {
  const { item } = route.params;
  const themeContext = useContext(ThemeContext);

  return (
    <Layout style={styles.container}>
      <Layout style={styles.photoContainer}>
        <Image source={{ uri: item.download_url }} style={styles.image} />
      </Layout>
      <Text category="h6">Author: {item.author}</Text>
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
  photoContainer: {
    marginVertical: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: 400,
    width: 300,
  },
});
