import { Component } from '@angular/core'
import { OfferList } from '../../data'
import { TinySliderComponent } from '@/app/components/tiny-slider/tiny-slider.component'
import type { TinySliderSettings } from 'tiny-slider'

@Component({
  selector: 'index10-courses',
  standalone: true,
  imports: [TinySliderComponent],
  templateUrl: './courses.component.html',
  styles: ``,
})
export class CoursesComponent {
  offersData = OfferList

  sliderConfig: TinySliderSettings = {
    autoplay: true,
    arrowKeys: true,
    controls: true,
    controlsText: [
      '<i class="fas fa-chevron-left"></i>',
      '<i class="fas fa-chevron-right"></i>',
    ],
    gutter: 30,
    responsive: {
      0: {
        items: 1,
      },
      576: {
        items: 2,
      },
      768: {
        items: 2,
      },
      992: {
        items: 3,
      },
      1200: {
        items: 4,
      },
    },
  }
}
