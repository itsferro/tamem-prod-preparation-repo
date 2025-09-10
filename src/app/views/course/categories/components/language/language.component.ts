import { Component } from '@angular/core'

@Component({
  selector: 'categories-language',
  standalone: true,
  imports: [],
  templateUrl: './language.component.html',
  styles: ``,
})
export class LanguageComponent {
  languages = [
    { flag: 'assets/images/flags/fr.svg', name: 'French' },
    { flag: 'assets/images/flags/gr.svg', name: 'German' },
    { flag: 'assets/images/flags/sp.svg', name: 'Español' },
    { flag: 'assets/images/flags/uk.svg', name: 'English' },
    { flag: 'assets/images/flags/in.svg', name: 'Hindi' },
    { flag: 'assets/images/flags/it.svg', name: 'Italian' },
    { flag: 'assets/images/flags/ar.svg', name: 'Arabic' },
    { flag: 'assets/images/flags/uk.svg', name: 'English' },
  ]
}
