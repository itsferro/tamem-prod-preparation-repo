import { Component } from '@angular/core'
import { CategoryList } from './data'
import { DecimalPipe } from '@angular/common'
import {
  NgbPaginationModule,
  NgbRatingModule,
} from '@ng-bootstrap/ng-bootstrap'
import { SelectFormInputDirective } from '@/app/core/directive/select-form-input.directive'
import { RouterLink } from '@angular/router'

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    DecimalPipe,
    NgbRatingModule,
    NgbPaginationModule,
    SelectFormInputDirective,
    RouterLink,
  ],
  templateUrl: './category.component.html',
  styles: ``,
})
export class CategoryComponent {
  categoryList = CategoryList
}
