import { Component } from '@angular/core'
import { PersonalInfoComponent } from './components/personal-info/personal-info.component'
import { StudentChartsComponent } from './components/student-charts/student-charts.component'
import { CoursesListComponent } from './components/courses-list/courses-list.component'
import { AllReviewsComponent } from './components/all-reviews/all-reviews.component'

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [
    PersonalInfoComponent,
    StudentChartsComponent,
    CoursesListComponent,
    AllReviewsComponent,
  ],
  templateUrl: './detail.component.html',
  styles: ``,
})
export class DetailComponent {}
