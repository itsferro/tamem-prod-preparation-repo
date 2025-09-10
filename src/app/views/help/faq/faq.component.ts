import { AppMenuComponent } from '@/app/components/app-menu/app-menu.components'
import { Component } from '@angular/core'
import { BannerComponent } from './components/banner/banner.component'
import { FaqListComponent } from './components/faq-list/faq-list.component'
import { RightSidebarComponent } from './components/right-sidebar/right-sidebar.component'
import { FooterComponent } from '@/app/components/footers/footer/footer.component'

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [
    AppMenuComponent,
    BannerComponent,
    FaqListComponent,
    RightSidebarComponent,
    FooterComponent,
  ],
  templateUrl: './faq.component.html',
  styles: ``,
})
export class FaqComponent {}
