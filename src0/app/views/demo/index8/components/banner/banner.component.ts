import { Component } from '@angular/core'
import { TestimonialList } from '../../data'
import { TinySliderComponent } from '@/app/components/tiny-slider/tiny-slider.component'
import type { TinySliderSettings } from 'tiny-slider'
import { ScrollToModule, ScrollToService } from '@nicky-lenaers/ngx-scroll-to'

@Component({
  selector: 'index8-banner',
  standalone: true,
  imports: [TinySliderComponent, ScrollToModule],
  templateUrl: './banner.component.html',
  providers: [ScrollToService],
})
export class BannerComponent {
  testimonialData = TestimonialList

  sliderConfig: TinySliderSettings = {
    autoplay: true,
    controls: true,
    controlsText: [
      '<i class="fas fa-chevron-left"></i>',
      '<i class="fas fa-chevron-right"></i>',
    ],
    edgePadding: 2,
    items: 1,
  }
}
