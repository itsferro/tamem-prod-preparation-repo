import { Component } from '@angular/core'
import { EventsList } from '../../data'
import { CommonModule } from '@angular/common'
import { TinySliderComponent } from '@/app/components/tiny-slider/tiny-slider.component'
import type { TinySliderSettings } from 'tiny-slider'

@Component({
  selector: 'index5-event',
  standalone: true,
  imports: [CommonModule, TinySliderComponent],
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
    gutter: 30,
    responsive: {
      0: {
        items: 1,
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
