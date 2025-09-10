import { TinySliderComponent } from '@/app/components/tiny-slider/tiny-slider.component'
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import type { TinySliderSettings } from 'tiny-slider'
import { trendingCourse } from '../../data'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'index1-trending',
  standalone: true,
  imports: [TinySliderComponent, CommonModule],
  templateUrl: './trending.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TrendingComponent {
  courseList = trendingCourse

  SliderSetting: TinySliderSettings = {
    arrowKeys: true,
    autoplay: true,
    controlsText: [
      '<i class="fas fa-chevron-left"></i>',
      '<i class="fas fa-chevron-right"></i>',
    ],

    controls: true,
    edgePadding: 2,
    items: 3,
    nav: false,
    responsive: {
      1: {
        items: 1,
        gutter: 10,
      },
      768: {
        items: 2,
        gutter: 30,
      },
      992: {
        items: 2,
        gutter: 30,
      },
      1200: {
        items: 3,
        gutter: 30,
      },
    },
  }
}
