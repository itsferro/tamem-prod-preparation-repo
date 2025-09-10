import { AppMenuComponent } from '@/app/components/app-menu/app-menu.components'
import { ClientSliderComponent } from '@/app/components/client-slider/client-slider.component'
import { TinySliderComponent } from '@/app/components/tiny-slider/tiny-slider.component'
import { Component } from '@angular/core'
import type { TinySliderSettings } from 'tiny-slider'
import { DemoFormComponent } from './components/demo-form/demo-form.component'
import { Footer2Component } from '@/app/components/footers/footer2/footer2.component'

@Component({
  selector: 'app-request-demo',
  standalone: true,
  imports: [
    AppMenuComponent,
    ClientSliderComponent,
    TinySliderComponent,
    DemoFormComponent,
    Footer2Component,
  ],
  templateUrl: './request-demo.component.html',
  styles: ``,
})
export class RequestDEmoComponent {
  sliderConfig: TinySliderSettings = {
    autoplay: true,
    gutter: 80,
    responsive: {
      0: {
        items: 2,
      },
      576: {
        items: 2,
      },
      1200: {
        items: 3,
      },
    },
  }
}
