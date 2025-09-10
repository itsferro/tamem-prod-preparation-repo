import { Component } from '@angular/core'
import { FullFeatureList } from '../../data'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'pricing-feature',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feature.component.html',
  styles: ``,
})
export class FeatureComponent {
  featuresList = FullFeatureList
}
