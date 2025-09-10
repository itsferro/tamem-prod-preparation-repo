import { Component } from '@angular/core'
import { ProductData } from '../../data'
import { CommonModule } from '@angular/common'
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'list-product',
  standalone: true,
  imports: [CommonModule, NgbPaginationModule],
  templateUrl: './product.component.html',
  styles: ``,
})
export class ProductComponent {
  productsList = ProductData
}
