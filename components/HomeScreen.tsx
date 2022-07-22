import { useCallback, useContext, useEffect, useState } from "react";
import { Image, FlatList, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Layout, StyleService, Text } from "@ui-kitten/components";
import { StatusBar } from "expo-status-bar";

import { ThemeContext } from "../context/ThemeContext";

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

export const HomeScreen = () => {
  const navigation = useNavigation<Nav>();
  const [photos, setPhotos] = useState<Photos[]>([]);
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const themeContext = useContext(ThemeContext);

  const fetchInitialPhotos = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://picsum.photos/v2/list?page=${pageNumber}&limit=30`
      );
      const data = await res.json();
      setPhotos(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const fetchMorePhotos = useCallback(async (nextPageNumber: number) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://picsum.photos/v2/list?page=${nextPageNumber}&limit=30`
      );
      const data = await res.json();
      setPhotos((prevState) => {
        return [...prevState, ...data];
      });
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    fetchInitialPhotos();
  }, []);

  return (
    <Layout style={styles.container}>
      <Layout style={styles.albumContainer}>
        <FlatList
          data={photos}
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
            const nextPageNumber = pageNumber + 1;
            setPageNumber(nextPageNumber);
            fetchMorePhotos(nextPageNumber);
          }}
        />
        {loading && <Text category="h5">Loading...</Text>}
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
