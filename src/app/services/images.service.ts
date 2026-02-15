import { Injectable } from '@angular/core';
import {ImageData} from "../Models/image-data";
import { GENERATED_IMAGE_DATA } from '../shared/images_provider.gen';

export enum Category {
  Paintings = "Paintings",
  PhotoOne = "PhotoOne",
  PhotoTwo = "PhotoTwo",
  PhotoThree = "PhotoThree",
  PhotoFour = "PhotoFour",
  Candles = "Candles",
  All = "All",
  Profile = "Profile",
}

export enum ImageSize {
  Miniature = "miniature",
  Full = "full"
}

@Injectable({
  providedIn: 'root'
})
export class ImagesService {
  // Build images map from generated data provider. Keys are folder names used by GENERATED_IMAGE_DATA.

  private images: { [category: string]: ImageData[] } = {};

  // Map our Category enum values to provider keys in GENERATED_IMAGE_DATA
  private categoryToKey: { [c in Category]?: string } = {
    [Category.Paintings]: 'paintings',
    [Category.PhotoOne]: 'photos/category1',
    [Category.PhotoTwo]: 'photos/category2',
    [Category.PhotoThree]: 'photos/category3',
    [Category.PhotoFour]: 'photos/category4',
    [Category.Candles]: 'candles',
    [Category.Profile]: 'profile_images'
  };

  constructor() {
    this.loadGeneratedData();
  }

  private loadGeneratedData() {
    // Convert GENERATED_IMAGE_DATA into ImageData instances and store by provider key
    for (const folder of Object.keys(GENERATED_IMAGE_DATA)) {
      const items = GENERATED_IMAGE_DATA[folder] || [];
      this.images[folder] = items.map(i => new ImageData(i.title || '', i.imageUrl, i.miniatureUrl));
    }

    // Ensure mapped categories exist (empty arrays if not present)
    for (const catKey of Object.keys(this.categoryToKey)) {
      const key = (this.categoryToKey as any)[catKey];
      if (key && !this.images[key]) {
        this.images[key] = [];
      }
    }
  }

  // Public API remains: accept Category for convenience. For custom keys, you can access GENERATED_IMAGE_DATA directly.
  getImagesData(category: Category) : ImageData[] {
    if (category === Category.All) {
      const all = Object.values(this.images).reduce((acc, val) => acc.concat(val), [] as ImageData[]);
      return all.slice();
    }
    const key = this.categoryToKey[category];
    if (!key) { return []; }
    return (this.images[key] || []).slice();
  }

  getImages(category: Category, sizeVariant: ImageSize = ImageSize.Full) : string[] {
    if (category === Category.All) {
      const all = Object.values(this.images).reduce((acc, val) => acc.concat(val), [] as ImageData[]);
      return all.map(image => sizeVariant === ImageSize.Full ? image.imageUrl : image.miniatureUrl);
    }
    const key = this.categoryToKey[category];
    if (!key) { return []; }
    return (this.images[key] || []).map(image => sizeVariant === ImageSize.Full ? image.imageUrl : image.miniatureUrl);
  }

  getRandomImageUrl(category: Category, imageSize: ImageSize = ImageSize.Miniature) {
    if (category === Category.All) {
      const allImages = Object.values(this.images).reduce((acc, val) => acc.concat(val), [] as ImageData[]);
      if (allImages.length === 0) return '';
      const randomIndex = Math.floor(Math.random() * allImages.length);
      return imageSize === ImageSize.Full ? allImages[randomIndex].imageUrl : allImages[randomIndex].miniatureUrl;
    } else if (category === Category.Profile) {
      const key = this.categoryToKey[Category.Profile];
      const list = key ? (this.images[key] || []) : [];
      if (list.length === 0) return '';
      return list[Math.floor(Math.random() * list.length)][imageSize === ImageSize.Full ? 'imageUrl' : 'miniatureUrl'];
    }
    else {
      const key = this.categoryToKey[category];
      if (!key) return '';
      const list = this.images[key] || [];
      if (list.length === 0) return '';
      const randomIndex = Math.floor(Math.random() * list.length);
      return imageSize == ImageSize.Full ? list[randomIndex].imageUrl : list[randomIndex].miniatureUrl;
    }
  }
}
