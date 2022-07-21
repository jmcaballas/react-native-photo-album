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
  const [loading, setLoading] = useState(false);
  const pageNumber = 1;

  const fetchImages = async () => {
    try {
      setLoading(true);
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

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <Layout style={styles.container}>
      <Layout style={styles.albumContainer}>
        {loading ? (
          <Text category="h5">Loading...</Text>
        ) : (
          <FlatList
            data={photos}
            keyExtractor={(item) => item.id.toString()}
            numColumns={3}
            renderItem={({ item }) => (
              <Image source={{ uri: item.download_url }} style={styles.image} />
            )}
          />
        )}
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
