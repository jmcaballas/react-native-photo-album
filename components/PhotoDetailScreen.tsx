import { Image } from "react-native";
import { Layout, StyleService, Text } from "@ui-kitten/components";

export const PhotoDetailScreen = ({ route }: { route: any }) => {
  const { item } = route.params;

  return (
    <Layout style={styles.container}>
      <Text category="h5">Photo Detail</Text>
    </Layout>
  );
};

const styles = StyleService.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});
