import { Component } from '@angular/core'
import { FAQData } from '../../data'
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'faq-list',
  standalone: true,
  imports: [NgbAccordionModule],
  templateUrl: './faq-list.component.html',
  styles: ``,
})
export class FaqListComponent {
  faqs = FAQData
}
