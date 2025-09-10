import { CommonModule } from '@angular/common'
import { Component, inject } from '@angular/core'
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  Validators,
  type UntypedFormGroup,
} from '@angular/forms'

@Component({
  selector: 'book-online-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './online-form.component.html',
  styles: ``,
})
export class OnlineFormComponent {
  onlineFrom!: UntypedFormGroup
  submit: boolean = false

  public fb = inject(UntypedFormBuilder)

  ngOnInit(): void {
    this.onlineFrom = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      class: ['', [Validators.required]],
    })
  }

  get form() {
    return this.onlineFrom.controls
  }

  onSubmit() {
    this.submit = true
  }
}
