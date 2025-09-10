import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'detail-course-intro',
  standalone: true,
  imports: [],
  templateUrl: './course-intro.component.html',
  styleUrl: './course-intro.component.scss'
})
export class CourseIntroComponent implements OnInit {
  @Input() subjectTitle: string = 'الرياضيات المتقدمة';
  @Input() subjectDescription: string = '';
  @Input() features: any[] = [];

  defaultFeatures = [
    {
      icon: 'bi bi-layers',
      title: 'محتوى منظم',
      description: 'جميع الدروس مقسمة إلى وحدات متسلسلة تسهل عملية التعلم'
    },
    {
      icon: 'bi bi-clipboard-check',
      title: 'تمارين تفاعلية',
      description: 'تطبيق عملي مباشر للمفاهيم لضمان فهم أعمق للمادة'
    },
    {
      icon: 'bi bi-graph-up',
      title: 'تتبع التقدم',
      description: 'متابعة مستمرة لتقدمك وإنجازاتك في المادة'
    }
  ];

  constructor() {}

  ngOnInit() {
    // If no features were provided, use the default ones
    if (!this.features || this.features.length === 0) {
      this.features = this.defaultFeatures;
    }

    // If no description was provided, generate a default one
    if (!this.subjectDescription) {
      this.subjectDescription = `مرحباً بك في مادة ${this.subjectTitle}! هذه المنصة تهدف إلى تقديم محتوى تعليمي عالي الجودة يساعدك على فهم المفاهيم الأساسية وتطوير مهاراتك في هذا المجال. ستجد هنا دروساً منظمة ومصممة لضمان تعلم فعّال وممتع.`;
    }
  }

  startLearning() {
    console.log('Start learning clicked');
    // You can add navigation or other logic here
  }
}
