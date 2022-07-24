import { createContext } from "react";
import {
  Model,
  model,
  modelAction,
  prop,
  registerRootStore,
  tProp,
  types,
} from "mobx-keystone";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface IPhotos {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
}

@model("PhotoAlbum/Album")
class AlbumModel extends Model({
  photos: prop<IPhotos[]>(() => []),
  loading: tProp(types.boolean),
  pageNumber: tProp(types.number),
}) {
  @modelAction
  loadInitialPhotos = async () => {
    const savedPhotos = await AsyncStorage.getItem("savedPhotos");

    if (savedPhotos === null) {
      this.fetchPhotos();
    } else {
      this.updatePhotos(JSON.parse(savedPhotos));
    }
  };

  @modelAction
  loadMorePhotos = () => {
    const savedPageNumber = AsyncStorage.getItem("savedPageNumber");

    if (savedPageNumber === null) {
      this.pageNumber = 1;
      this.fetchPhotos();
    } else {
      console.log(savedPageNumber);
      // this.pageNumber = Number(savedPageNumber);
      this.pageNumber++;
      this.fetchPhotos();
    }
  };

  @modelAction
  fetchPhotos = async () => {
    this.loading = true;
    try {
      const res = await fetch(
        `https://picsum.photos/v2/list?page=${this.pageNumber}&limit=30`
      );
      const data = await res.json();
      this.updatePhotos(data);
    } catch (err) {
      console.log(err);
      this.loading = false;
    }
  };

  @modelAction
  updatePhotos = (newPhotos: Array<IPhotos>) => {
    newPhotos = newPhotos.filter((photo) => this.photos.indexOf(photo) < 0);
    this.photos = this.photos.concat(newPhotos);
    AsyncStorage.setItem("savedPhotos", JSON.stringify(this.photos));
    AsyncStorage.setItem("savedPageNumber", JSON.stringify(this.pageNumber));
    this.loading = false;
  };
}

const createAppStore = (): AlbumModel => {
  const store = new AlbumModel({
    photos: [],
    loading: false,
    pageNumber: 1,
  });

  registerRootStore(store);
  return store;
};

const appContext = createContext(createAppStore());
export default appContext;
