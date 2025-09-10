import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'

@Component({
  selector: 'profile-update-password',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './update-password.component.html',
  styles: ``,
})
export class UpdatePasswordComponent {
  passwordType: boolean = true

  showPassword() {
    this.passwordType = !this.passwordType
  }
}
