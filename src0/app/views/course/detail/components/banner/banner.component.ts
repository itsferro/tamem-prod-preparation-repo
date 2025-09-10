import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'detail-banner',
  standalone: true,
  imports: [],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss'
})
export class BannerComponent {

  @Input() courseData: any = null; 
  
  subjectInfo : any  ; 
  
    ngOnChanges(changes: SimpleChanges) {
      if (changes['subjectData'] && changes['subjectData'].currentValue) {
      
        this.subjectInfo = this.courseData.subjectInfo;
        console.log('📌 Received Subject Info:', this.subjectInfo);
  
      }
    }
    


}
