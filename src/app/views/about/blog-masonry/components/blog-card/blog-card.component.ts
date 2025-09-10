import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { NgxMasonryModule } from 'ngx-masonry'
import { CommonModule } from '@angular/common'
import { credits, currency } from '@/app/common/constants'

@Component({
  selector: 'blog-masonary-card',
  standalone: true,
  imports: [NgxMasonryModule, CommonModule],
  templateUrl: './blog-card.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BlogCardComponent {
  currency = currency
  credits = credits
}
