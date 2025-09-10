import { Component } from '@angular/core'
import { RouterLink } from '@angular/router'

@Component({
  selector: 'app-logo-box',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './logo-box.component.html',
  styles: `
    :host(app-logo-box) {
      display: contents;
    }
  `,
})
export class LogoBoxComponent {}
