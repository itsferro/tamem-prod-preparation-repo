import { SelectFormInputDirective } from '@/app/core/directive/select-form-input.directive'
import { Component } from '@angular/core'

@Component({
  selector: 'general-setting',
  standalone: true,
  imports: [SelectFormInputDirective],
  templateUrl: './general-setting.component.html',
  styles: ``,
})
export class GeneralSettingComponent {}
