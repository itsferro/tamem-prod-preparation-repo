import { Component } from '@angular/core'
import { courseList } from '../../data'
import { NgbNavModule, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'index1-popular-course',
  standalone: true,
  imports: [NgbNavModule, NgbRatingModule, CommonModule],
  templateUrl: './popular-course.component.html',
  styles: ``,
})
export class PopularCourseComponent {
  courseList = courseList
}
