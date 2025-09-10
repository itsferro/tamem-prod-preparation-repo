import { CommonModule } from '@angular/common'
import { Component, inject, type OnInit } from '@angular/core'
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  Validators,
  type UntypedFormGroup,
} from '@angular/forms'

@Component({
  selector: 'demo-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './demo-form.component.html',
  styles: ``,
})
export class DemoFormComponent implements OnInit {
  requestFrom!: UntypedFormGroup
  submit: boolean = false

  public fb = inject(UntypedFormBuilder)

  ngOnInit(): void {
    this.requestFrom = this.fb.group({
      fname: ['', [Validators.required]],
      lname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      city: ['', [Validators.required]],
      language: ['', [Validators.required]],
      note: ['', [Validators.required]],
    })
  }

  get form() {
    return this.requestFrom.controls
  }

  onSubmit() {
    this.submit = true
  }
}
