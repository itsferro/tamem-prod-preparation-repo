
import { Component } from '@angular/core';
import { AppMenuComponent } from '@/app/components/app-menu/app-menu.components'


import { FooterComponent } from '@/app/components/footers/footer/footer.component'
import { ListComponent } from '../catalog/components/list/list.component'
import { BannerComponent } from './components/banner/banner.component';
import { ActionBoxComponent } from './components/action-box/action-box.component';


@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [
     AppMenuComponent,
     BannerComponent,
     ActionBoxComponent,
     FooterComponent,
     ListComponent,

   ],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss'
})
export class CatalogComponent {

}
