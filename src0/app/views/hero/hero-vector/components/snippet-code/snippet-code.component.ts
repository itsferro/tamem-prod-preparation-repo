import { Component, type AfterViewInit } from '@angular/core'
import * as Prism from 'prismjs'

@Component({
  selector: 'hero-vector-snippet-code',
  standalone: true,
  imports: [],
  templateUrl: './snippet-code.component.html',
  styles: ``,
})
export class SnippetCodeComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    Prism.highlightAll()
  }
}
