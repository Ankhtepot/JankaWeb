import { Injectable } from '@angular/core';

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
  images: { [category: string]: string[] } = {
    Paintings: [
      "assets/images/paintings/2.jpg",
      "assets/images/paintings/3.jpg",
      "assets/images/paintings/4.jpg",
      "assets/images/paintings/5.jpg",
      "assets/images/paintings/6.jpg",
      "assets/images/paintings/8.jpg",
      "assets/images/paintings/9.jpg",
      "assets/images/paintings/10.jpg",
      "assets/images/paintings/11.jpg",
      "assets/images/paintings/12.jpg",
      "assets/images/paintings/19.jpg",
      "assets/images/paintings/21.jpg",
      "assets/images/paintings/24.jpg",
      "assets/images/paintings/26.jpg",
    ],
    PhotoOne: [
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150"
    ],
    PhotoTwo: [
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150"
    ],
    PhotoThree: [
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150"
    ],
    PhotoFour: [
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150"
    ],
    Candles: [
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150"
    ]
  };

  constructor() { }

  getImages(category: Category) {
    return this.images[category];
  }
}
