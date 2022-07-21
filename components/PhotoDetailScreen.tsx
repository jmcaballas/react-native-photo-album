import { Image } from "react-native";
import { Layout, StyleService, Text } from "@ui-kitten/components";

export const PhotoDetailScreen = ({ route }: { route: any }) => {
  const { item } = route.params;

  return (
    <Layout style={styles.container}>
      <Layout style={styles.photoContainer}>
        <Image source={{ uri: item.download_url }} style={styles.image} />
      </Layout>
      <Text category="h6">Author: {item.author}</Text>
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
