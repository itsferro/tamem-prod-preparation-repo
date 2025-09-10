import { AppMenuComponent } from '@/app/components/app-menu/app-menu.components'
import { Component } from '@angular/core'
import { BannerComponent } from './components/banner/banner.component'
import { ContactFormComponent } from './components/contact-form/contact-form.component'
import { MapComponent } from './components/map/map.component'
import { FooterComponent } from '@/app/components/footers/footer/footer.component'

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [
    AppMenuComponent,
    BannerComponent,
    ContactFormComponent,
    MapComponent,
    FooterComponent,
  ],
  templateUrl: './contact-us.component.html',
  styles: ``,
})
export class ContactUsComponent {}
