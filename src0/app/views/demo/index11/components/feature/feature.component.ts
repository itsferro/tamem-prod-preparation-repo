import { Component } from '@angular/core'
import { DomSanitizer } from '@angular/platform-browser'
import { FeatureList } from '../../data'

@Component({
  selector: 'index11-feature',
  standalone: true,
  imports: [],
  templateUrl: './feature.component.html',
  styles: ``,
})
export class FeatureComponent {
  features = FeatureList

  constructor(private sanitizer: DomSanitizer) {}

  sanitizeIcon(icon: string) {
    return this.sanitizer.bypassSecurityTrustHtml(icon)
  }
}
