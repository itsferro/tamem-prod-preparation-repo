import { AppMenuComponent } from '@/app/components/app-menu/app-menu.components'
import { Component } from '@angular/core'
import { BannerComponent } from './components/banner/banner.component'
import { AwardComponent } from './components/award/award.component'
import { FounderComponent } from './components/founder/founder.component'
import { ClientComponent } from './components/client/client.component'
import { FooterComponent } from '@/app/components/footers/footer/footer.component'

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    AppMenuComponent,
    BannerComponent,
    AwardComponent,
    FounderComponent,
    ClientComponent,
    FooterComponent,
  ],
  templateUrl: './about.component.html',
  styles: ``,
})
export class AboutComponent {}
