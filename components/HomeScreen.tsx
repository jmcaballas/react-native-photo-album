import { StyleSheet } from "react-native";
import { Layout, Text } from "@ui-kitten/components";

export const HomeScreen = () => {
  return (
    <Layout style={styles.container}>
      <Text>Photo Album</Text>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
