import { AppMenuComponent } from '@/app/components/app-menu/app-menu.components'
import { Component } from '@angular/core'
import { BannerComponent } from './components/banner/banner.component'
import { ProductComponent } from './components/product/product.component'
import { ActionBoxComponent } from './components/action-box/action-box.component'
import { SelectFormInputDirective } from '@/app/core/directive/select-form-input.directive'
import { FooterComponent } from '@/app/components/footers/footer/footer.component'

@Component({
  selector: 'app-list2',
  standalone: true,
  imports: [
    AppMenuComponent,
    BannerComponent,
    ProductComponent,
    ActionBoxComponent,
    SelectFormInputDirective,
    FooterComponent,
  ],
  templateUrl: './list2.component.html',
  styles: ``,
})
export class List2Component {}
