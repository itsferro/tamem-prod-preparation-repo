import { Component } from '@angular/core'
import { Testimonials } from '../../data'
import { TinySliderComponent } from '@/app/components/tiny-slider/tiny-slider.component'
import type { TinySliderSettings } from 'tiny-slider'

@Component({
  selector: 'request-access-testimonials',
  standalone: true,
  imports: [TinySliderComponent],
  templateUrl: './testimonials.component.html',
  styles: ``,
})
export class TestimonialsComponent {
  testimonialsList = Testimonials

  sliderConfig: TinySliderSettings = {
    autoplay: true,
    controls: true,
    controlsText: [
      '<i class="fas fa-chevron-left"></i>',
      '<i class="fas fa-chevron-right"></i>',
    ],
    edgePadding: 2,
    responsive: {
      0: {
        items: 1,
      },
      576: {
        items: 1,
      },
      768: {
        items: 2,
      },
    },
  }
}
