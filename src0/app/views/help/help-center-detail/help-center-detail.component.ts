import { AppMenuComponent } from '@/app/components/app-menu/app-menu.components'
import { FooterComponent } from '@/app/components/footers/footer/footer.component'
import { ScrolledToDirective } from '@/app/core/directive/scrolledTo.directive'
import { StickyDirective } from '@/app/core/directive/sticky.directive'
import { Component, type OnInit } from '@angular/core'
import { AccountSetupComponent } from './components/account-setup/account-setup.component'
import { AdvanceComponent } from './components/advance/advance.component'
import { BannerComponent } from './components/banner/banner.component'
import { GetStartedComponent } from './components/get-started/get-started.component'
import { OtherTopicsComponent } from './components/other-topics/other-topics.component'

@Component({
  selector: 'app-help-center-detail',
  standalone: true,
  imports: [
    AppMenuComponent,
    BannerComponent,
    GetStartedComponent,
    AccountSetupComponent,
    AdvanceComponent,
    OtherTopicsComponent,
    StickyDirective,
    FooterComponent,
    ScrolledToDirective,
  ],
  templateUrl: './help-center-detail.component.html',
  styles: ``,
  providers: [],
})
export class HelpCenterDetailComponent implements OnInit {
  ngOnInit(): void {}
}
