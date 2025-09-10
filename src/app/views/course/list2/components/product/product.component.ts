import { Component } from '@angular/core'
import { ProductData } from '../../data'
import {
  NgbPaginationModule,
  NgbRatingModule,
} from '@ng-bootstrap/ng-bootstrap'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'list2-product',
  standalone: true,
  imports: [CommonModule, NgbRatingModule, NgbPaginationModule],
  templateUrl: './product.component.html',
  styles: ``,
})
export class ProductComponent {
  productsList = ProductData
}
