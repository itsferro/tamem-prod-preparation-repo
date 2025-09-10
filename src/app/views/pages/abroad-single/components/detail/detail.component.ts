import { Component } from '@angular/core'
import { IntakeList, UniversityList } from '../../data'
import { RouterLink } from '@angular/router'

@Component({
  selector: 'abroad-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './detail.component.html',
  styles: ``,
})
export class DetailComponent {
  intakeList = IntakeList
  universities = UniversityList

  courseList = [
    'Engineering',
    'Biomedical',
    'Visual Arts',
    'Business Administration',
    'Liberal Arts & Science',
    'Social Science',
    'Health Care',
    'Intensive English',
    'Mathematics',
    'Computer Science',
  ]
  programList = [
    'Advance Diploma',
    'Applied Degree',
    'AEC',
    'Associate Degree',
    'Bachelor Degree',
    'Certificate',
    'Diploma',
    'Doctorate',
    'DEC',
    'Post Graduate',
    'Master',
    'University Transfer',
  ]
}
