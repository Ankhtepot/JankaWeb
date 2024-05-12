import { Injectable } from '@angular/core';
import {ImageData} from "../Models/image-data";

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

const dummyImages : ImageData[] = [
  new ImageData("placeholder","https://via.placeholder.com/500", "https://via.placeholder.com/1024"),
  new ImageData("placeholder","https://via.placeholder.com/500", "https://via.placeholder.com/1024"),
  new ImageData("placeholder","https://via.placeholder.com/500", "https://via.placeholder.com/1024"),
  new ImageData("placeholder","https://via.placeholder.com/500", "https://via.placeholder.com/1024"),
  new ImageData("placeholder","https://via.placeholder.com/500", "https://via.placeholder.com/1024"),
  new ImageData("placeholder","https://via.placeholder.com/500", "https://via.placeholder.com/1024"),
  new ImageData("placeholder","https://via.placeholder.com/500", "https://via.placeholder.com/1024"),
  new ImageData("placeholder","https://via.placeholder.com/500", "https://via.placeholder.com/1024"),
  new ImageData("placeholder","https://via.placeholder.com/500", "https://via.placeholder.com/1024"),
  new ImageData("placeholder","https://via.placeholder.com/500", "https://via.placeholder.com/1024"),
]

@Injectable({
  providedIn: 'root'
})
export class ImagesService {
  images: { [category: string]: ImageData[] } = {
    Paintings: [
      new ImageData('Painting 2', 'assets/images/paintings/2.jpg','assets/images/paintings/miniatures/2.jpg' ),
      new ImageData('Painting 3', 'assets/images/paintings/3.jpg', 'assets/images/paintings/miniatures/3.jpg'),
      new ImageData('Painting 4', 'assets/images/paintings/4.jpg', 'assets/images/paintings/miniatures/4.jpg'),
      new ImageData('Painting 5', 'assets/images/paintings/5.jpg', 'assets/images/paintings/miniatures/5.jpg'),
      new ImageData('Painting 6', 'assets/images/paintings/6.jpg', 'assets/images/paintings/miniatures/6.jpg'),
      new ImageData('Painting 8', 'assets/images/paintings/8.jpg', 'assets/images/paintings/miniatures/8.jpg'),
      new ImageData('Painting 9', 'assets/images/paintings/9.jpg', 'assets/images/paintings/miniatures/9.jpg'),
      new ImageData('Painting 10', 'assets/images/paintings/10.jpg', 'assets/images/paintings/miniatures/10.jpg'),
      new ImageData('Painting 11', 'assets/images/paintings/11.jpg', 'assets/images/paintings/miniatures/11.jpg'),
      new ImageData('Painting 12', 'assets/images/paintings/12.jpg', 'assets/images/paintings/miniatures/12.jpg'),
      new ImageData('Painting 19', 'assets/images/paintings/19.jpg', 'assets/images/paintings/miniatures/19.jpg'),
      new ImageData('Painting 21', 'assets/images/paintings/21.jpg', 'assets/images/paintings/miniatures/21.jpg'),
      new ImageData('Painting 24', 'assets/images/paintings/24.jpg', 'assets/images/paintings/miniatures/24.jpg'),
      new ImageData('Painting 26', 'assets/images/paintings/26.jpg', 'assets/images/paintings/miniatures/26.jpg'),
    ],
    PhotoOne: dummyImages,
    PhotoTwo: dummyImages,
    PhotoThree: dummyImages,
    PhotoFour: dummyImages,
    Candles: dummyImages
  };

  profileImages: ImageData[] = [
    new ImageData('Profile photo 1', 'assets/images/profile_images/dance.jpg'),
    new ImageData('Profile photo 2', 'assets/images/profile_images/greeting.jpg'),
    new ImageData('Profile photo 3', 'assets/images/profile_images/leaning_on_wall.jpg'),
  ]

  constructor() { }


  getImagesData(category: Category) : ImageData[] {
    return this.images[category].slice();
  }

  getImages(category: Category, sizeVariant: ImageSize = ImageSize.Full) : string[] {
    return this.images[category].map(image => sizeVariant === ImageSize.Full ? image.imageUrl : image.miniatureUrl);
  }

  getRandomImageUrl(category: Category, imageSize: ImageSize = ImageSize.Miniature) {
    if (category === Category.All) {
      const allImages = Object.values(this.images).reduce((acc, val) => acc.concat(val), []);
      const randomIndex = Math.floor(Math.random() * allImages.length);
      return imageSize === ImageSize.Full ? allImages[randomIndex].imageUrl : allImages[randomIndex].miniatureUrl;
    } else if (category === Category.Profile) {
      return this.profileImages[Math.floor(Math.random() * this.profileImages.length)].imageUrl;
    }
    else {
      const randomIndex = Math.floor(Math.random() * this.images[category].length);
      return imageSize == ImageSize.Full ? this.images[category][randomIndex].imageUrl : this.images[category][randomIndex].miniatureUrl;
    }
  }
}
