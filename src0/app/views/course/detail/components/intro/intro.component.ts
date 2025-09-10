import { Component, Input, SimpleChanges } from '@angular/core'
import { CurriculumComponent } from '../curriculum/curriculum.component';

@Component({
  selector: 'detail-intro',
  standalone: true,
  imports: [ CurriculumComponent],
  templateUrl: './intro.component.html',
  styles: ``,
})
export class IntroComponent {

  @Input() subjectData: any = null; 
  
  subjectInfo : any  ; 
  
    ngOnChanges(changes: SimpleChanges) {
      if (changes['subjectData'] && changes['subjectData'].currentValue) {
      
        this.subjectInfo = this.subjectData.subjectInfo;
        console.log('📌 Received Subject Info:', this.subjectInfo);
  
      }
    }
    


}
