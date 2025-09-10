import { Component } from '@angular/core'
import {
  NgbPaginationModule,
  NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap'
import { StudentQuiz } from '../../data'

@Component({
  selector: 'student-quiz',
  standalone: true,
  imports: [NgbPaginationModule, NgbTooltipModule],
  templateUrl: './student-quiz.component.html',
  styles: ``,
})
export class StudentQuizComponent {
  quizList = StudentQuiz
}
