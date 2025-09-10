import { SelectFormInputDirective } from '@/app/core/directive/select-form-input.directive'
import { Component } from '@angular/core'

@Component({
  selector: 'admission-personal-info',
  standalone: true,
  imports: [SelectFormInputDirective],
  templateUrl: './personal-info.component.html',
  styles: ``,
})
export class PersonalInfoComponent {}
