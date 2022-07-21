import { useEffect, useState } from "react";
import { Image, FlatList, StyleSheet } from "react-native";
import { Layout, Text } from "@ui-kitten/components";

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
  const pageNumber = 1;

  const fetchImages = async () => {
    try {
      const res = await fetch(
        `https://picsum.photos/v2/list?page=${pageNumber}&limit=30`
      );
      const data = await res.json();
      setPhotos(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  console.log(photos);

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
        />
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
  },
  image: {
    height: 100,
    width: 100,
    margin: 5,
  },
});
