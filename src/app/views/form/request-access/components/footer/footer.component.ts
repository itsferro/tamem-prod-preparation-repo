import { credits, currentYear } from '@/app/common/constants'
import { FooterItems, SocialList } from '@/app/common/footer-item'
import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { RouterLink } from '@angular/router'

@Component({
  selector: 'request-access-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './footer.component.html',
  styles: ``,
})
export class FooterComponent {
  socials = SocialList
  footerData = FooterItems
  credits = credits
  currentYear = currentYear
}
