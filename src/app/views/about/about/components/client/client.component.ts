import { Component } from '@angular/core'

@Component({
  selector: 'about-client',
  standalone: true,
  imports: [],
  templateUrl: './client.component.html',
  styles: ``,
})
export class ClientComponent {
  clientList = [
    {
      image: 'assets/images/client/microsoft.svg',
    },
    {
      image: 'assets/images/client/linkedin.svg',
    },
    {
      image: 'assets/images/client/netflix.svg',
    },
    {
      image: 'assets/images/client/coca-cola.svg',
    },
    {
      image: 'assets/images/client/envato.svg',
    },
    {
      image: 'assets/images/client/android.svg',
    },
    {
      image: 'assets/images/client/coca-cola.svg',
    },
    {
      image: 'assets/images/client/shippable.svg',
    },
    {
      image: 'assets/images/client/algolia.svg',
    },
    {
      image: 'assets/images/client/importio.svg',
    },
    {
      image: 'assets/images/client/yamaha.svg',
    },
  ]
}
