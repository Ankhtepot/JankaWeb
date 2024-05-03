import { Injectable } from '@angular/core';
import {ImageData} from "../Models/image-data";

export enum Category {
  Paintings = "Paintings",
  PhotoOne = "PhotoOne",
  PhotoTwo = "PhotoTwo",
  PhotoThree = "PhotoThree",
  PhotoFour = "PhotoFour",
  Candles = "Candles"
}

@Injectable({
  providedIn: 'root'
})
export class ImagesService {
  images: { [category: string]: ImageData[] } = {
    Paintings: [
      new ImageData('Painting 2', 'assets/images/paintings/miniatures/2.jpg', 'assets/images/paintings/2.jpg'),
      new ImageData('Painting 3', 'assets/images/paintings/miniatures/3.jpg', 'assets/images/paintings/3.jpg'),
      new ImageData('Painting 4', 'assets/images/paintings/miniatures/4.jpg', 'assets/images/paintings/4.jpg'),
      new ImageData('Painting 5', 'assets/images/paintings/miniatures/5.jpg', 'assets/images/paintings/5.jpg'),
      new ImageData('Painting 6', 'assets/images/paintings/miniatures/6.jpg', 'assets/images/paintings/6.jpg'),
      new ImageData('Painting 8', 'assets/images/paintings/miniatures/8.jpg', 'assets/images/paintings/8.jpg'),
      new ImageData('Painting 9', 'assets/images/paintings/miniatures/9.jpg', 'assets/images/paintings/9.jpg'),
      new ImageData('Painting 10', 'assets/images/paintings/miniatures/10.jpg', 'assets/images/paintings/10.jpg'),
      new ImageData('Painting 11', 'assets/images/paintings/miniatures/11.jpg', 'assets/images/paintings/11.jpg'),
      new ImageData('Painting 12', 'assets/images/paintings/miniatures/12.jpg', 'assets/images/paintings/12.jpg'),
      new ImageData('Painting 19', 'assets/images/paintings/miniatures/19.jpg', 'assets/images/paintings/19.jpg'),
      new ImageData('Painting 21', 'assets/images/paintings/miniatures/21.jpg', 'assets/images/paintings/21.jpg'),
      new ImageData('Painting 24', 'assets/images/paintings/miniatures/24.jpg', 'assets/images/paintings/24.jpg'),
      new ImageData('Painting 26', 'assets/images/paintings/miniatures/26.jpg', 'assets/images/paintings/26.jpg'),
    ],
    PhotoOne: [
      new ImageData("placeholder","https://via.placeholder.com/500", "https://via.placeholder.com/1024"),
      new ImageData("placeholder","https://via.placeholder.com/500", "https://via.placeholder.com/1024"),
      new ImageData("placeholder","https://via.placeholder.com/500", "https://via.placeholder.com/1024"),
      new ImageData("placeholder","https://via.placeholder.com/500", "https://via.placeholder.com/1024"),
      new ImageData("placeholder","https://via.placeholder.com/500", "https://via.placeholder.com/1024"),
    ],
    PhotoTwo: [
      new ImageData("placeholder","https://via.placeholder.com/500", "https://via.placeholder.com/1024"),
      new ImageData("placeholder","https://via.placeholder.com/500", "https://via.placeholder.com/1024"),
      new ImageData("placeholder","https://via.placeholder.com/500", "https://via.placeholder.com/1024"),
      new ImageData("placeholder","https://via.placeholder.com/500", "https://via.placeholder.com/1024"),
      new ImageData("placeholder","https://via.placeholder.com/500", "https://via.placeholder.com/1024"),
    ],
    PhotoThree: [
      new ImageData("placeholder","https://via.placeholder.com/500", "https://via.placeholder.com/1024"),
      new ImageData("placeholder","https://via.placeholder.com/500", "https://via.placeholder.com/1024"),
      new ImageData("placeholder","https://via.placeholder.com/500", "https://via.placeholder.com/1024"),
      new ImageData("placeholder","https://via.placeholder.com/500", "https://via.placeholder.com/1024"),
      new ImageData("placeholder","https://via.placeholder.com/500", "https://via.placeholder.com/1024"),
    ],
    PhotoFour: [
      new ImageData("placeholder","https://via.placeholder.com/500", "https://via.placeholder.com/1024"),
      new ImageData("placeholder","https://via.placeholder.com/500", "https://via.placeholder.com/1024"),
      new ImageData("placeholder","https://via.placeholder.com/500", "https://via.placeholder.com/1024"),
      new ImageData("placeholder","https://via.placeholder.com/500", "https://via.placeholder.com/1024"),
      new ImageData("placeholder","https://via.placeholder.com/500", "https://via.placeholder.com/1024"),
    ],
    Candles: [
      new ImageData("placeholder","https://via.placeholder.com/500", "https://via.placeholder.com/1024"),
      new ImageData("placeholder","https://via.placeholder.com/500", "https://via.placeholder.com/1024"),
      new ImageData("placeholder","https://via.placeholder.com/500", "https://via.placeholder.com/1024"),
      new ImageData("placeholder","https://via.placeholder.com/500", "https://via.placeholder.com/1024"),
      new ImageData("placeholder","https://via.placeholder.com/500", "https://via.placeholder.com/1024"),
    ]
  };

  constructor() { }

  getImages(category: Category) : ImageData[] {
    return this.images[category].slice();
  }
}
