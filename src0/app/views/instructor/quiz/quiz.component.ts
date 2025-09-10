import { Component } from '@angular/core'
import { CourseItemsComponent } from './components/course-items/course-items.component'
import { StudentQuizComponent } from './components/student-quiz/student-quiz.component'

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CourseItemsComponent, StudentQuizComponent],
  templateUrl: './quiz.component.html',
  styles: ``,
})
export class QuizComponent {}
