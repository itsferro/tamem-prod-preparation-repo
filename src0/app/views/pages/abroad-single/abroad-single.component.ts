import { AppMenuComponent } from '@/app/components/app-menu/app-menu.components'
import { Component } from '@angular/core'
import { BannerComponent } from './components/banner/banner.component'
import { DetailComponent } from './components/detail/detail.component'
import { ActionBoxComponent } from './components/action-box/action-box.component'
import { FooterComponent } from '@/app/components/footers/footer/footer.component'

@Component({
  selector: 'app-abroad-single',
  standalone: true,
  imports: [
    AppMenuComponent,
    BannerComponent,
    DetailComponent,
    ActionBoxComponent,
    FooterComponent,
  ],
  templateUrl: './abroad-single.component.html',
  styles: ``,
})
export class AbroadSingleComponent {}
