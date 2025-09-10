import { Component } from '@angular/core'
import { featureList } from '../../data'

@Component({
  selector: 'index4-feature',
  standalone: true,
  imports: [],
  templateUrl: './feature.component.html',
  styles: ``,
})
export class FeatureComponent {
  features = featureList
}
