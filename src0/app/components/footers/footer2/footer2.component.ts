import { credits, currentYear } from '@/app/common/constants'
import {
  FooterItems2,
  FooterItems3,
  SocialList,
} from '@/app/common/footer-item'
import { CommonModule } from '@angular/common'
import { Component, inject, Input, type OnInit } from '@angular/core'
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  Validators,
  type UntypedFormGroup,
} from '@angular/forms'
import { RouterLink } from '@angular/router'

@Component({
  selector: 'app-footer2',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './footer2.component.html',
  styles: ``,
})
export class Footer2Component implements OnInit {
  @Input() showTitle: boolean = false
  @Input() className: string = ''
  subscribeForm!: UntypedFormGroup
  submit: boolean = false
  year = currentYear
  credits = credits

  socials = SocialList
  item1List = FooterItems2
  item2List = FooterItems3

  public fb = inject(UntypedFormBuilder)

  ngOnInit(): void {
    this.subscribeForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    })
  }

  get form() {
    return this.subscribeForm.controls
  }

  onSubmit() {
    this.submit = true
  }
}
