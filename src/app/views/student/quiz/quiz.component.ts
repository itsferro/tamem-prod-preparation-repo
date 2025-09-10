import { StepperDirective } from '@/app/core/directive/stepper.directive'
import { Component } from '@angular/core'

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [StepperDirective],
  templateUrl: './quiz.component.html',
  styles: ``,
})
export class QuizComponent {
  quizList = [
    { id: 1, title: 'How do you protect your business against cyber-crime?' },
    { id: 2, title: 'What is SEO?' },
    { id: 3, title: 'Who should join this course?' },
    { id: 4, title: 'What are the T&C for this program?' },
  ]
}
