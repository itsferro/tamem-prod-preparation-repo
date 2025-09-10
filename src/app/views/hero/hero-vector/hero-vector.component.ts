import { Component } from '@angular/core'
import { TopbarComponent } from './components/topbar/topbar.component'
import { BannerComponent } from './components/banner/banner.component'
import { SnippetCodeComponent } from './components/snippet-code/snippet-code.component'

@Component({
  selector: 'app-hero-vector',
  standalone: true,
  imports: [TopbarComponent, BannerComponent, SnippetCodeComponent],
  templateUrl: './hero-vector.component.html',
  styles: ``,
})
export class HeroVectorComponent {}
