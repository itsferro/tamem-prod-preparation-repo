import { Component } from '@angular/core'
import { LightgalleryModule } from 'lightgallery/angular'
import lgVideo from 'lightgallery/plugins/video'

@Component({
  selector: 'index9-about',
  standalone: true,
  imports: [LightgalleryModule],
  templateUrl: './about.component.html',
  styleUrl: './about.components.scss',
})
export class AboutComponent {
  settings = {
    counter: false,
    plugins: [lgVideo],
    selector: 'a',
    download: false,
  }
}
