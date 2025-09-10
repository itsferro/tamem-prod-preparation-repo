import { Component } from '@angular/core'
import { FAQData } from '../../data'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'advance-course-faq',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-faq.component.html',
  styles: ``,
})
export class CourseFAQComponent {
  faqList = FAQData
}
