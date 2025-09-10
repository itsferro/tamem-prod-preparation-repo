import { Component } from '@angular/core'
import { TopList } from '../../data'
import { TinySliderComponent } from '@/app/components/tiny-slider/tiny-slider.component'
import type { TinySliderSettings } from 'tiny-slider'
import { RouterLink } from '@angular/router'

@Component({
  selector: 'index11-top-listed',
  standalone: true,
  imports: [TinySliderComponent, RouterLink],
  templateUrl: './top-listed.component.html',
  styles: ``,
})
export class TopListedComponent {
  listData = TopList

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
      576: {
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
