import { TinySliderComponent } from '@/app/components/tiny-slider/tiny-slider.component'
import { Component } from '@angular/core'
import type { TinySliderSettings } from 'tiny-slider'
import { RelatedInstructor } from '../../data'
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap'
import { DecimalPipe } from '@angular/common'

@Component({
  selector: 'single-related-instructor',
  standalone: true,
  imports: [TinySliderComponent, NgbRatingModule, DecimalPipe],
  templateUrl: './related-instructor.component.html',
  styles: ``,
})
export class RelatedInstructorComponent {
  instructorList = RelatedInstructor

  sliderConfig: TinySliderSettings = {
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
