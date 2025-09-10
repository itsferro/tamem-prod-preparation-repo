import { Component } from '@angular/core'
import { FAQList } from '../../../detail/data'

@Component({
  selector: 'minimal-faqs',
  standalone: true,
  imports: [],
  templateUrl: './faqs.component.html',
  styles: ``,
})
export class FaqsComponent {
  faqs = FAQList
}
