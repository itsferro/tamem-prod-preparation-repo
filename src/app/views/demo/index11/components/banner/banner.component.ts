import { Component } from '@angular/core'
import { LightgalleryModule } from 'lightgallery/angular'
import lgVideo from 'lightgallery/plugins/video'

@Component({
  selector: 'index11-banner',
  standalone: true,
  imports: [LightgalleryModule],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss',
})
export class BannerComponent {
  settings = {
    counter: false,
    plugins: [lgVideo],
    selector: 'a',
    download: false,
  }
}
