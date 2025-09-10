import { Component } from '@angular/core'
import { FeaturesList, PricingList } from '../../data'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'pricing-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './banner.component.html',
  styles: ``,
})
export class BannerComponent {
  planList = PricingList
  featuresList = FeaturesList
  planType: boolean = false

  changePrice(event: any) {
    this.planType = event.target.checked
  }
}
