import { Component } from '@angular/core'
import { ReviewListComponent } from './components/review-list/review-list.component'
import { ReviewAnalyticsComponent } from './components/review-analytics/review-analytics.component'
import { TopRatedCourseComponent } from './components/top-rated-course/top-rated-course.component'

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [
    ReviewListComponent,
    ReviewAnalyticsComponent,
    TopRatedCourseComponent,
  ],
  templateUrl: './review.component.html',
  styles: ``,
})
export class ReviewComponent {}
