import { Component } from '@angular/core'
import { CustomerFeedback } from '../../data'
import { TinySliderComponent } from '@/app/components/tiny-slider/tiny-slider.component'
import type { TinySliderSettings } from 'tiny-slider'

@Component({
  selector: 'index7-client-feedback',
  standalone: true,
  imports: [TinySliderComponent],
  templateUrl: './client-feedback.component.html',
  styles: ``,
})
export class ClientFeedbackComponent {
  feedbackList = CustomerFeedback

  sliderConfig: TinySliderSettings = {
    autoplay: true,
    edgePadding: 5,
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
    },
  }
}
