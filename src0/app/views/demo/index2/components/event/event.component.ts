import { Component } from '@angular/core'
import { EventsList } from '../../data'
import { TinySliderComponent } from '@/app/components/tiny-slider/tiny-slider.component'
import type { TinySliderSettings } from 'tiny-slider'

@Component({
  selector: 'index2-event',
  standalone: true,
  imports: [TinySliderComponent],
  templateUrl: './event.component.html',
  styles: ``,
})
export class EventComponent {
  events = EventsList

  sliderConfig: TinySliderSettings = {
    autoplay: false,
    arrowKeys: true,
    controls: true,
    controlsText: [
      '<i class="fas fa-chevron-left"></i>',
      '<i class="fas fa-chevron-right"></i>',
    ],
    items: 3,
    gutter: 25,
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
    },
  }
}
