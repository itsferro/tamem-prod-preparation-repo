import { Component } from '@angular/core'
import { RecommendedList } from '../../data'
import { RouterLink } from '@angular/router'

@Component({
  selector: 'help-center-recommended-topics',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './recommended-topics.component.html',
  styles: ``,
})
export class RecommendedTopicsComponent {
  recommended = RecommendedList
}
