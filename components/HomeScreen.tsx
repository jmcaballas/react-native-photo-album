import { useCallback, useEffect, useState } from "react";
import { Image, FlatList, StyleSheet } from "react-native";
import { Button, Layout, Text } from "@ui-kitten/components";

interface Photos {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
}

export const HomeScreen = () => {
  const [photos, setPhotos] = useState<Photos[]>([]);
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState<number>(1);

  const fetchInitialImages = async () => {
    setLoading(false);
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
  };

  const fetchMoreImages = async (nextPageNumber: number) => {
    setLoading(false);
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
  };

  useEffect(() => {
    fetchInitialImages();
  }, []);

  return (
    <Layout style={styles.container}>
      <Layout style={styles.albumContainer}>
        <FlatList
          data={photos}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3}
          renderItem={({ item }) => (
            <Image source={{ uri: item.download_url }} style={styles.image} />
          )}
          onEndReached={() => {
            const nextPageNumber = pageNumber + 1;
            setPageNumber(nextPageNumber);
            fetchMoreImages(nextPageNumber);
          }}
        />
        {loading && <Text category="h5">Loading...</Text>}
      </Layout>
    </Layout>
  );
};

const styles = StyleSheet.create({
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
