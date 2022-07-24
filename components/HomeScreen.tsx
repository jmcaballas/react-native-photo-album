import { useContext, useEffect } from "react";
import { Image, FlatList, TouchableOpacity } from "react-native";
import { observer } from "mobx-react";
import { useNavigation } from "@react-navigation/native";
import { Layout, StyleService, Text } from "@ui-kitten/components";
import { StatusBar } from "expo-status-bar";

import { ThemeContext } from "../context/ThemeContext";
import appContext from "../store/Store";

type Nav = {
  navigate: (value: string, item: any) => void;
};

interface Photos {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
}

const HomeScreen = () => {
  const navigation = useNavigation<Nav>();
  const appStore = useContext(appContext);
  const themeContext = useContext(ThemeContext);

  useEffect(() => {
    appStore.loadInitialPhotos();
  }, [appStore]);

  return (
    <Layout style={styles.container}>
      <Layout style={styles.albumContainer}>
        <FlatList
          data={appStore.photos}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Photo Detail", { item })}
            >
              <Image source={{ uri: item.download_url }} style={styles.image} />
            </TouchableOpacity>
          )}
          onEndReached={() => {
            appStore.loadMorePhotos();
          }}
        />
        {appStore.loading && <Text category="h5">Loading...</Text>}
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
    justifyContent: "center",
  },
  albumContainer: {
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: 100,
    width: 100,
    margin: 5,
  },
});

export default observer(HomeScreen);
