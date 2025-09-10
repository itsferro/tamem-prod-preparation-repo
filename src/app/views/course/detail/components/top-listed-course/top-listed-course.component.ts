import { Component } from '@angular/core'
import { TopCourses } from '../../data'
import { TinySliderComponent } from '@/app/components/tiny-slider/tiny-slider.component'
import { TinySliderSettings } from 'tiny-slider'

@Component({
  selector: 'detail-top-listed-course',
  standalone: true,
  imports: [TinySliderComponent],
  templateUrl: './top-listed-course.component.html',
  styles: ``,
})
export class TopListedCourseComponent {
  courseList = TopCourses

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
      0: { items: 1 },
      768: {
        items: 2,
      },
      1200: {
        items: 3,
      },
    },
  }
}
