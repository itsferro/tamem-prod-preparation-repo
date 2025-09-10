import { SelectFormInputDirective } from '@/app/core/directive/select-form-input.directive'
import { Component } from '@angular/core'

@Component({
  selector: 'checkout-personal-detail',
  standalone: true,
  imports: [SelectFormInputDirective],
  templateUrl: './personal-detail.component.html',
  styles: ``,
})
export class PersonalDetailComponent {}
