import { Component } from '@angular/core'
import { SubjectList } from '../../data'

@Component({
  selector: 'index9-subject',
  standalone: true,
  imports: [],
  templateUrl: './subject.component.html',
  styles: ``,
})
export class SubjectComponent {
  subjectsData = SubjectList
}
