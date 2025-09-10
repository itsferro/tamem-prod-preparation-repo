import { credits, currentYear } from '@/app/common/constants'
import { SocialList } from '@/app/common/footer-item'
import { Component } from '@angular/core'
import { RouterModule } from '@angular/router'

@Component({
  selector: 'app-footer3',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './footer3.component.html',
  styles: ``,
})
export class Footer3Component {
  year = currentYear
  credits = credits
  socials = SocialList
}
