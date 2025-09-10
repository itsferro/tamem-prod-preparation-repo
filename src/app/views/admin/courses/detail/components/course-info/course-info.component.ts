import { currency } from '@/app/common/constants'
import { Component } from '@angular/core'

@Component({
  selector: 'detail-course-info',
  standalone: true,
  imports: [],
  templateUrl: './course-info.component.html',
  styles: ``,
})
export class CourseInfoComponent {
  currency = currency
}
