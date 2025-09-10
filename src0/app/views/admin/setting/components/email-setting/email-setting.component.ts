import { SelectFormInputDirective } from '@/app/core/directive/select-form-input.directive'
import { Component } from '@angular/core'
import { EmailTemplates } from '../../data'

@Component({
  selector: 'email-setting',
  standalone: true,
  imports: [SelectFormInputDirective],
  templateUrl: './email-setting.component.html',
  styles: ``,
})
export class EmailSettingComponent {
  templates = EmailTemplates
}
