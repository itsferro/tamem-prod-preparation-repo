import { Component } from '@angular/core';


interface Challenge {
  id: number;
  title: string;
  description: string;
  icon: string;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  completed: boolean;
  locked: boolean;
}


@Component({
  selector: 'detail-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {


  lessonTitle = 'عملية التمثيل الضوئي';
  completedChallenges = 0;
  totalChallenges = 6;
  currentScore = 0;
  totalPossibleScore = 100;
  progressPercentage = 0;

  challenges: Challenge[] = [
    {
      id: 1,
      title: 'اختبار المعرفة الأساسية',
      description: 'أجب على أسئلة متعددة الخيارات حول المفاهيم الأساسية للتمثيل الضوئي',
      icon: 'fa-lightbulb',
      difficulty: 'easy',
      points: 15,
      completed: false,
      locked: false
    },
    {
      id: 2,
      title: 'مطابقة المصطلحات',
      description: 'اسحب وأفلت المصطلحات لمطابقتها مع تعريفاتها الصحيحة',
      icon: 'fa-exchange-alt',
      difficulty: 'easy',
      points: 15,
      completed: false,
      locked: false
    },
    {
      id: 3,
      title: 'ترتيب مراحل التمثيل الضوئي',
      description: 'رتب خطوات عملية التمثيل الضوئي بالترتيب الصحيح',
      icon: 'fa-sort-numeric-down',
      difficulty: 'medium',
      points: 20,
      completed: false,
      locked: true
    },
    {
      id: 4,
      title: 'التعرف على أجزاء النبات',
      description: 'حدد أجزاء النبات المشاركة في عملية التمثيل الضوئي',
      icon: 'fa-leaf',
      difficulty: 'medium',
      points: 15,
      completed: false,
      locked: true
    },
    {
      id: 5,
      title: 'تطبيق المفاهيم',
      description: 'حل مشكلة حقيقية باستخدام مفاهيم التمثيل الضوئي',
      icon: 'fa-puzzle-piece',
      difficulty: 'hard',
      points: 20,
      completed: false,
      locked: true
    },
    {
      id: 6,
      title: 'استكمال المخطط المفاهيمي',
      description: 'أكمل مخطط مفاهيمي يوضح العلاقات بين مكونات عملية التمثيل الضوئي',
      icon: 'fa-project-diagram',
      difficulty: 'hard',
      points: 15,
      completed: false,
      locked: true
    }
  ];

  constructor() {
    this.updateProgress();
  }

  getDifficultyText(difficulty: string): string {
    switch(difficulty) {
      case 'easy': return 'سهل';
      case 'medium': return 'متوسط';
      case 'hard': return 'صعب';
      default: return '';
    }
  }

  startChallenge(challengeId: number): void {
    // Navigate to specific challenge
    console.log(`Starting challenge ${challengeId}`);
  }

  updateProgress(): void {
    this.completedChallenges = this.challenges.filter(c => c.completed).length;
    this.progressPercentage = (this.completedChallenges / this.totalChallenges) * 100;
    
    // Calculate score based on completed challenges
    this.currentScore = this.challenges
      .filter(c => c.completed)
      .reduce((total, challenge) => total + challenge.points, 0);
  }

  
}
