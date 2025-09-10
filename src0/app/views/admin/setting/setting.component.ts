import { Component } from '@angular/core'
import { WebsiteSettingComponent } from './components/website-setting/website-setting.component'
import { GeneralSettingComponent } from './components/general-setting/general-setting.component'
import { NotificationSettingComponent } from './components/notification-setting/notification-setting.component'
import { AccountSettingComponent } from './components/account-setting/account-setting.component'
import { SocialSettingComponent } from './components/social-setting/social-setting.component'
import { EmailSettingComponent } from './components/email-setting/email-setting.component'
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-setting',
  standalone: true,
  imports: [
    WebsiteSettingComponent,
    GeneralSettingComponent,
    NotificationSettingComponent,
    AccountSettingComponent,
    SocialSettingComponent,
    EmailSettingComponent,
    NgbNavModule,
  ],
  templateUrl: './setting.component.html',
  styles: ``,
})
export class SettingComponent {}
