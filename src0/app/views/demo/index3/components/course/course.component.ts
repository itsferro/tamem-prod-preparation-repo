import { TinySliderComponent } from '@/app/components/tiny-slider/tiny-slider.component'
import { Component } from '@angular/core'
import type { TinySliderSettings } from 'tiny-slider'

@Component({
  selector: 'index3-course',
  standalone: true,
  imports: [TinySliderComponent],
  templateUrl: './course.component.html',
  styles: ``,
})
export class CourseComponent {
  courseList = [
    {
      image: 'assets/images/element/22.svg',
      name: 'Chemistry',
    },
    {
      image: 'assets/images/element/23.svg',
      name: 'Physics',
    },
    {
      image: 'assets/images/element/21.svg',
      name: 'Technology',
    },
    {
      image: 'assets/images/element/24.svg',
      name: 'Health',
    },
    {
      image: 'assets/images/element/25.svg',
      name: 'Business',
    },
    {
      image: 'assets/images/element/26.svg',
      name: 'Engineer',
    },
  ]

  sliderConfig: TinySliderSettings = {
    autoplay: true,
    gutter: 80,
    arrowKeys: true,
    controls: true,
    controlsText: [
      '<i class="fas fa-chevron-left"></i>',
      '<i class="fas fa-chevron-right"></i>',
    ],
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
      992: {
        items: 3,
      },
      1200: {
        items: 5,
      },
    },
  }
}
