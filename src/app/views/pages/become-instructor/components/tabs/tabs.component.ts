import { CommonModule } from '@angular/common'
import { Component, inject, type OnInit } from '@angular/core'
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  Validators,
  type UntypedFormGroup,
} from '@angular/forms'
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'become-tabs',
  standalone: true,
  imports: [NgbNavModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './tabs.component.html',
  styles: ``,
})
export class TabsComponent implements OnInit {
  contactForm!: UntypedFormGroup
  submit: boolean = false

  public fb = inject(UntypedFormBuilder)

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      summary: ['', [Validators.required]],
    })
  }

  get form() {
    return this.contactForm.controls
  }

  onSubmit() {
    this.submit = true
  }
}
