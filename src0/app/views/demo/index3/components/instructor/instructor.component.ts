import { Component } from '@angular/core'
import { instructorList } from '../../data'
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap'
import { TinySliderComponent } from '@/app/components/tiny-slider/tiny-slider.component'
import type { TinySliderSettings } from 'tiny-slider'

@Component({
  selector: 'index3-instructor',
  standalone: true,
  imports: [NgbRatingModule, TinySliderComponent],
  templateUrl: './instructor.component.html',
  styles: ``,
})
export class InstructorComponent {
  instructors = instructorList

  sliderConfig: TinySliderSettings = {
    autoplay: true,
    arrowKeys: true,
    controls: true,
    controlsText: [
      '<i class="fas fa-chevron-left"></i>',
      '<i class="fas fa-chevron-right"></i>',
    ],
    items: 4,
    gutter: 30,
    responsive: {
      0: {
        items: 1,
      },
      570: {
        items: 2,
      },
      768: {
        items: 2,
      },
      1200: {
        items: 4,
      },
    },
  }
}
