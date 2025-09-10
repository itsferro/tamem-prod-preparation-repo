import { AppMenuComponent } from '@/app/components/app-menu/app-menu.components'
import { Component } from '@angular/core'
import { BannerComponent } from './components/banner/banner.component'
import { ServicesComponent } from './components/services/services.component'
import { ContactFormComponent } from './components/contact-form/contact-form.component'
import { FaqComponent } from './components/faq/faq.component'
import { Footer3Component } from '@/app/components/footers/footer3/footer3.component'

@Component({
  selector: 'app-index8',
  standalone: true,
  imports: [
    AppMenuComponent,
    BannerComponent,
    ServicesComponent,
    ContactFormComponent,
    FaqComponent,
    Footer3Component,
  ],
  templateUrl: './index8.component.html',
  styles: ``,
})
export class Index8Component {}
