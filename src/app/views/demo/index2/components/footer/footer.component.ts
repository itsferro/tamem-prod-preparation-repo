import { credits, currentYear } from '@/app/common/constants'
import { FooterItems, SocialList } from '@/app/common/footer-item'
import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { RouterModule } from '@angular/router'

@Component({
  selector: 'index2-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.component.html',
  styles: ``,
})
export class FooterComponent {
  footerData = FooterItems
  socials = SocialList
  credits = credits
  currentYear = currentYear
}
