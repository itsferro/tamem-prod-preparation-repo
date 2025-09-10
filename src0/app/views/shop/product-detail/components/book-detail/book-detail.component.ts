import { Component, inject, type OnInit } from '@angular/core'
import {
  NgbNavModule,
  NgbProgressbarModule,
  NgbRatingModule,
} from '@ng-bootstrap/ng-bootstrap'
import { ReviewData } from '../../data'
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'product-book-detail',
  standalone: true,
  imports: [
    NgbNavModule,
    NgbProgressbarModule,
    NgbRatingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './book-detail.component.html',
  styles: ``,
})
export class BookDetailComponent implements OnInit {
  reviews = ReviewData
  reviewForm!: UntypedFormGroup
  submit: boolean = false

  public fb = inject(UntypedFormBuilder)

  ngOnInit(): void {
    this.reviewForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      rating: ['', [Validators.required]],
      message: ['', [Validators.required]],
    })
  }

  get form() {
    return this.reviewForm.controls
  }

  onSubmit() {
    this.submit = true
  }
}
