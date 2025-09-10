import { Component } from '@angular/core'
import { BannerComponent } from './components/banner/banner.component'
import { HeaderComponent } from './components/header/header.component'
import { SnippetCodeComponent } from './components/snippet-code/snippet-code.component'

@Component({
  selector: 'app-hero-form',
  standalone: true,
  imports: [BannerComponent, HeaderComponent, SnippetCodeComponent],
  templateUrl: './hero-form.component.html',
  styles: ``,
})
export class HeroFormComponent {}
