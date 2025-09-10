import { Component } from '@angular/core'
import { ProfileDetailComponent } from './components/profile-detail/profile-detail.component'
import { LinkedAccountComponent } from './components/linked-account/linked-account.component'
import { SocialMediaProfileComponent } from './components/social-media-profile/social-media-profile.component'
import { UpdateEmailComponent } from './components/update-email/update-email.component'
import { UpdatePasswordComponent } from './components/update-password/update-password.component'

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [
    ProfileDetailComponent,
    LinkedAccountComponent,
    SocialMediaProfileComponent,
    UpdateEmailComponent,
    UpdatePasswordComponent,
  ],
  templateUrl: './edit-profile.component.html',
  styles: ``,
})
export class EditProfileComponent {}
