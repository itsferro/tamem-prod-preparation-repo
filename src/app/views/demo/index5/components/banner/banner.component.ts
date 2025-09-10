import { TinySliderComponent } from '@/app/components/tiny-slider/tiny-slider.component'
import { Component } from '@angular/core'
import { RouterLink } from '@angular/router'
import type { TinySliderSettings } from 'tiny-slider'

@Component({
  selector: 'index5-banner',
  standalone: true,
  imports: [TinySliderComponent, RouterLink],
  templateUrl: './banner.component.html',
  styles: ``,
})
export class BannerComponent {
  sliderConfig: TinySliderSettings = {
    controls: true,
    controlsText: [
      '<i class="fas fa-chevron-left"></i>',
      '<i class="fas fa-chevron-right"></i>',
    ],
    items: 1,
  }
}
