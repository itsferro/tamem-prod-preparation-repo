import { Component } from '@angular/core'
import { LiveCourseList } from '../../data'
import { TinySliderComponent } from '@/app/components/tiny-slider/tiny-slider.component'
import type { TinySliderSettings } from 'tiny-slider'
import { LightgalleryModule } from 'lightgallery/angular'
import lgVideo from 'lightgallery/plugins/video'
import { autoplaySettings } from 'lightgallery/plugins/autoplay/lg-autoplay-settings'

@Component({
  selector: 'index4-live-course',
  standalone: true,
  imports: [TinySliderComponent, LightgalleryModule],
  templateUrl: './live-course.component.html',
  styleUrl: './live-course.components.scss',
})
export class LiveCourseComponent {
  courseList = LiveCourseList

  sliderConfig: TinySliderSettings = {
    arrowKeys: true,
    edgePadding: 2,
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
      1200: {
        items: 2,
      },
    },
  }

  settings = {
    counter: false,
    plugins: [lgVideo],
    selector: '.vLightbox',
    download: false,
    autoplayVideoOnSlide: true,
  }
}
