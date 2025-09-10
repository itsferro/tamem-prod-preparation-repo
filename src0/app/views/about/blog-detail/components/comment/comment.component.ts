import { CommonModule } from '@angular/common'
import { Component, inject, type OnInit } from '@angular/core'
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  Validators,
  type UntypedFormGroup,
} from '@angular/forms'
import { CommentList } from '../../data'

@Component({
  selector: 'blog-detail-comment',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './comment.component.html',
  styles: ``,
})
export class CommentComponent implements OnInit {
  comments = CommentList
  viewForm!: UntypedFormGroup
  submitted: boolean = false

  public fb = inject(UntypedFormBuilder)

  ngOnInit() {
    this.viewForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      comment: ['', Validators.required],
    })
  }

  get form() {
    return this.viewForm.controls
  }

  onSubmit() {
    this.submitted = true
  }
}
