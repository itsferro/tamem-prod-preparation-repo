import { SelectFormInputDirective } from '@/app/core/directive/select-form-input.directive'
import { Component } from '@angular/core'

@Component({
  selector: 'module-notes',
  standalone: true,
  imports: [SelectFormInputDirective],
  templateUrl: './notes.component.html',
  styles: ``,
})
export class NotesComponent {}
