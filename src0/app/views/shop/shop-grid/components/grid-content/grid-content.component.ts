import { SelectFormInputDirective } from '@/app/core/directive/select-form-input.directive'
import { Component } from '@angular/core'
import { ShopGrid } from '../../data'
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap'
import { RouterLink } from '@angular/router'

@Component({
  selector: 'shop-grid-content',
  standalone: true,
  imports: [SelectFormInputDirective, NgbPaginationModule, RouterLink],
  templateUrl: './grid-content.component.html',
  styles: ``,
})
export class GridContentComponent {
  shopList = ShopGrid
}
