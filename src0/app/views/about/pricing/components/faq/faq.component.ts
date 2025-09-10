import { Component } from '@angular/core'
import { FAQData } from '../../data'

@Component({
  selector: 'pricing-faq',
  standalone: true,
  imports: [],
  templateUrl: './faq.component.html',
  styles: ``,
})
export class FaqComponent {
  faqs = FAQData
}
