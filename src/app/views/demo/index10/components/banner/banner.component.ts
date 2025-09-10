import { Component } from '@angular/core'
import { CountUpModule } from 'ngx-countup'
import { bannerData } from '../../data'

@Component({
  selector: 'index10-banner',
  standalone: true,
  imports: [CountUpModule],
  templateUrl: './banner.component.html',
  styles: ``,
})
export class BannerComponent {
  bannerData = bannerData
}
