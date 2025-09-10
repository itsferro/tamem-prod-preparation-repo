import { AppMenuComponent } from '@/app/components/app-menu/app-menu.components'
import { Component } from '@angular/core'
import { BannerComponent } from './components/banner/banner.component'
import { FeatureComponent } from './components/feature/feature.component'
import { FaqComponent } from './components/faq/faq.component'
import { ClientSliderComponent } from '@/app/components/client-slider/client-slider.component'
import { FooterComponent } from '@/app/components/footers/footer/footer.component'

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [
    AppMenuComponent,
    BannerComponent,
    FeatureComponent,
    FaqComponent,
    ClientSliderComponent,
    FooterComponent,
  ],
  templateUrl: './pricing.component.html',
  styles: ``,
})
export class PricingComponent {}
