import { Component, OnInit } from '@angular/core'
import { FrameComponent } from '../frame/frame.component';

@Component({
  selector: 'story-board-banner',
  standalone: true,
  imports: [FrameComponent],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss'
})
export class BannerComponent implements OnInit {

  numberOfFrames = 5;

  ngOnInit() {
   
  }
 

}
