import {Component, OnInit} from '@angular/core';
import {Category, ImageSize, ImagesService} from "../../services/images.service";

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss'
})
export class AboutMeComponent implements OnInit {
  profileImagePath: string;
  loremIpsum: string;
  backgroundImageUrl: string;

  constructor(private imagesService: ImagesService) {

  }

  ngOnInit(): void {
    this.profileImagePath = this.imagesService.getRandomImageUrl(Category.Profile, ImageSize.Full);
    this.backgroundImageUrl = this.imagesService.getRandomImageUrl(Category.Paintings, ImageSize.Full);
    this.loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Convallis posuere morbi leo urna molestie at. Mattis vulputate enim nulla aliquet. Massa ultricies mi quis hendrerit dolor magna eget est lorem. Fringilla urna porttitor rhoncus dolor purus non enim praesent elementum. Scelerisque purus semper eget duis. Diam volutpat commodo sed egestas egestas fringilla. Pretium quam vulputate dignissim suspendisse in est ante in. Tincidunt dui ut ornare lectus. Donec ac odio tempor orci dapibus ultrices in iaculis. Id velit ut tortor pretium viverra suspendisse potenti. Varius sit amet mattis vulputate enim nulla. Scelerisque eleifend donec pretium vulputate sapien nec sagittis.\n" +
      "\n" +
      "Rhoncus dolor purus non enim praesent elementum facilisis leo. Amet commodo nulla facilisi nullam vehicula ipsum a arcu cursus. Quam vulputate dignissim suspendisse in. Arcu ac tortor dignissim convallis. Tincidunt dui ut ornare lectus sit amet. Vitae turpis massa sed elementum tempus egestas sed. Ac odio tempor orci dapibus. Eget lorem dolor sed viverra ipsum nunc aliquet bibendum enim. Faucibus ornare suspendisse sed nisi lacus. Massa eget egestas purus viverra accumsan in nisl nisi. Cras fermentum odio eu feugiat pretium nibh ipsum consequat nisl. Vulputate eu scelerisque felis imperdiet proin fermentum leo vel orci. Habitant morbi tristique senectus et netus et. Consequat interdum varius sit amet. Hac habitasse platea dictumst quisque sagittis purus sit amet volutpat. Ridiculus mus mauris vitae ultricies leo. Quisque sagittis purus sit amet volutpat consequat. Ut ornare lectus sit amet est placerat in egestas erat.\n" +
      "\n" +
      "In nisl nisi scelerisque eu ultrices vitae. Tellus rutrum tellus pellentesque eu tincidunt tortor. Quis risus sed vulputate odio ut enim blandit volutpat. Placerat in egestas erat imperdiet sed euismod nisi porta lorem. Elit eget gravida cum sociis. Tristique nulla aliquet enim tortor at auctor urna. Et odio pellentesque diam volutpat. Enim praesent elementum facilisis leo vel fringilla est ullamcorper. Neque sodales ut etiam sit amet nisl purus in. Diam phasellus vestibulum lorem sed. Aliquam faucibus purus in massa tempor. Nisi est sit amet facilisis magna etiam tempor orci. Ultricies integer quis auctor elit sed vulputate mi sit. Hac habitasse platea dictumst quisque. Ut lectus arcu bibendum at. Vitae proin sagittis nisl rhoncus mattis. Quis varius quam quisque id diam vel quam. Eget mi proin sed libero. Egestas congue quisque egestas diam in arcu."
  }
}
