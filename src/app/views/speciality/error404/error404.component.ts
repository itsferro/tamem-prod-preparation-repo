import { AppMenuComponent } from '@/app/components/app-menu/app-menu.components'
import { FooterComponent } from '@/app/components/footers/footer/footer.component'
import { Component } from '@angular/core'
import { RouterLink } from '@angular/router'

@Component({
  selector: 'app-error404',
  standalone: true,
  imports: [AppMenuComponent, FooterComponent, RouterLink],
  templateUrl: './error404.component.html',
  styles: ``,
})
export class Error404Component {}
