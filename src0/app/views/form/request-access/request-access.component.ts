import { Component } from '@angular/core'
import { TopbarComponent } from './components/topbar/topbar.component'
import { BannerComponent } from './components/banner/banner.component'
import { ClientComponent } from './components/client/client.component'
import { TestimonialsComponent } from './components/testimonials/testimonials.component'
import { NewsletterComponent } from './components/newsletter/newsletter.component'
import { FooterComponent } from './components/footer/footer.component'

@Component({
  selector: 'app-request-access',
  standalone: true,
  imports: [
    TopbarComponent,
    BannerComponent,
    ClientComponent,
    TestimonialsComponent,
    NewsletterComponent,
    FooterComponent,
  ],
  templateUrl: './request-access.component.html',
  styles: ``,
})
export class RequestAccessComponent {}
