import { Component, Input } from '@angular/core'
import type { TinySliderSettings } from 'tiny-slider'
import { TinySliderComponent } from '../tiny-slider/tiny-slider.component'

@Component({
  selector: 'app-client-slider',
  standalone: true,
  imports: [TinySliderComponent],
  templateUrl: './client-slider.component.html',
  styles: ``,
})
export class ClientSliderComponent {
  @Input() imageClass!: string

  clientList = [
    {
      image: 'assets/images/client/coca-cola.svg',
    },
    {
      image: 'assets/images/client/android.svg',
    },
    {
      image: 'assets/images/client/envato.svg',
    },
    {
      image: 'assets/images/client/microsoft.svg',
    },
    {
      image: 'assets/images/client/netflix.svg',
    },
    {
      image: 'assets/images/client/google.svg',
    },
    {
      image: 'assets/images/client/linkedin.svg',
    },
  ]

  sliderConfig: TinySliderSettings = {
    autoplay: true,
    arrowKeys: false,
    gutter: 80,
    items: 6,
    responsive: {
      0: {
        items: 2,
      },
      576: {
        items: 3,
      },
      768: {
        items: 4,
      },
      992: {
        items: 5,
      },
      1200: {
        items: 6,
      },
    },
  }
}
