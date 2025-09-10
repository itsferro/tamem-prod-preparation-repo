import { TinySliderComponent } from '@/app/components/tiny-slider/tiny-slider.component'
import { Component } from '@angular/core'
import type { TinySliderSettings } from 'tiny-slider'
import { collegeData } from '../../data'
import { CommonModule } from '@angular/common'
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'index5-listed-college',
  standalone: true,
  imports: [TinySliderComponent, CommonModule, NgbRatingModule],
  templateUrl: './listed-college.component.html',
  styles: ``,
})
export class ListedCollegeComponent {
  collegeList = collegeData

  sliderConfig: TinySliderSettings = {
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
      576: {
        items: 2,
      },
      992: {
        items: 2,
      },
      1200: {
        items: 3,
      },
    },
  }
}
