import { SelectFormInputDirective } from '@/app/core/directive/select-form-input.directive'
import { Component } from '@angular/core'

@Component({
  selector: 'admission-education',
  standalone: true,
  imports: [SelectFormInputDirective],
  templateUrl: './education.component.html',
  styles: ``,
})
export class EducationComponent {}
