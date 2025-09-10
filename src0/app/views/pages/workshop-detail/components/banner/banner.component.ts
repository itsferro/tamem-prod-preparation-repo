import { currency } from '@/app/common/constants'
import { Component } from '@angular/core'
import { LightgalleryModule } from 'lightgallery/angular'
import lgVideo from 'lightgallery/plugins/video'

@Component({
  selector: 'workshop-banner',
  standalone: true,
  imports: [LightgalleryModule],
  templateUrl: './banner.component.html',
  styleUrl: './banner,component.scss',
})
export class BannerComponent {
  currency = currency
  settings = {
    counter: false,
    plugins: [lgVideo],
    selector: 'a',
    download: false,
  }
}
