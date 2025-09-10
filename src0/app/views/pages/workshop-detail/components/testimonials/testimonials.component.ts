import { TinySliderComponent } from '@/app/components/tiny-slider/tiny-slider.component'
import { Component } from '@angular/core'
import type { TinySliderSettings } from 'tiny-slider'
import { TestimonialsList } from '../../data'
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'workshop-testimonials',
  standalone: true,
  imports: [TinySliderComponent, NgbRatingModule],
  templateUrl: './testimonials.component.html',
  styles: ``,
})
export class TestimonialsComponent {
  testimonials = TestimonialsList

  sliderConfig: TinySliderSettings = {
    autoplay: true,
    arrowKeys: true,
    controls: true,
    controlsText: [
      '<i class="fas fa-chevron-left"></i>',
      '<i class="fas fa-chevron-right"></i>',
    ],
    edgePadding: 2,
    gutter: 30,
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 2,
      },
      1200: {
        items: 3,
      },
    },
  }
}
