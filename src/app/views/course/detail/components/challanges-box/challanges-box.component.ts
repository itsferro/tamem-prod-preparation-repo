 
// challenges.component.ts
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgClass } from '@angular/common';


interface Challenge {
  id: number;
  title: string;
  description: string;
  instructions: string;
  icon: string;
  type: 'matching' | 'ordering' | 'identification' | 'quiz';
  difficulty: 'سهل' | 'متوسط' | 'صعب';
  duration: string;
  points: number;
  status: 'locked' | 'active' | 'completed';
}

@Component({
  selector: 'detail-challanges-box',
  standalone: true,
  imports: [],
  templateUrl: './challanges-box.component.html',
  styleUrl: './challanges-box.component.scss'
})
export class ChallangesBoxComponent  implements OnInit {
  @Input() lessonData: any;
  @Output() challengeCompleted = new EventEmitter<string>();
  
  challenges: Challenge[] = [];
  selectedChallenge: Challenge | null = null;

  constructor() { }

  ngOnInit(): void {
    this.initializeChallenges();
  }

  initializeChallenges(): void {
    // In a real application, you would get this data from your lessonData input
    // This is example data
    this.challenges = [
      {
        id: 1,
        title: 'مطابقة المفاهيم',
        description: 'قم بمطابقة كل مفهوم مع تعريفه الصحيح',
        instructions: 'اسحب وأفلت المفاهيم من العمود الأيمن إلى التعريفات المناسبة في العمود الأيسر.',
        icon: 'fa-puzzle-piece',
        type: 'matching',
        difficulty: 'سهل',
        duration: '5 دقائق',
        points: 100,
        status: 'active'
      },
      {
        id: 2,
        title: 'ترتيب المراحل',
        description: 'رتب مراحل العملية بالترتيب الصحيح',
        instructions: 'اسحب العناصر وأعد ترتيبها لتشكيل التسلسل الصحيح للعملية.',
        icon: 'fa-sort-numeric-down',
        type: 'ordering',
        difficulty: 'متوسط',
        duration: '7 دقائق',
        points: 150,
        status: 'locked'
      },
      {
        id: 3,
        title: 'تحديد الأجزاء',
        description: 'حدد الأجزاء المختلفة على الصورة',
        instructions: 'انقر على الأجزاء المختلفة في الصورة وقم بتسميتها بشكل صحيح.',
        icon: 'fa-map-marker-alt',
        type: 'identification',
        difficulty: 'متوسط',
        duration: '8 دقائق',
        points: 200,
        status: 'locked'
      },
      {
        id: 4,
        title: 'اختبار معلوماتك',
        description: 'أجب على أسئلة متعددة الخيارات لتثبت فهمك',
        instructions: 'اختر الإجابة الصحيحة لكل سؤال. يجب أن تحصل على درجة 80% على الأقل للنجاح.',
        icon: 'fa-question-circle',
        type: 'quiz',
        difficulty: 'صعب',
        duration: '10 دقائق',
        points: 250,
        status: 'locked'
      },

    ];
  }

  onChallengeClick(challenge: Challenge): void {
    // Only allow interaction with active challenges
    if (challenge.status === 'active') {
      this.selectedChallenge = challenge;
    }
  }

  backToChallenges(): void {
    this.selectedChallenge = null;
  }

  completeChallenge(): void {
    if (!this.selectedChallenge) return;
    
    // Mark current challenge as completed
    const currentIndex = this.challenges.findIndex(c => c.id === this.selectedChallenge!.id);
    if (currentIndex !== -1) {
      this.challenges[currentIndex].status = 'completed';
      
      // Add animation class temporarily
      setTimeout(() => {
        const element = document.querySelectorAll('.challenge-item')[currentIndex] as HTMLElement;
        element.classList.add('newly-completed');
        
        // Remove the class after animation completes
        setTimeout(() => {
          element.classList.remove('newly-completed');
        }, 1000);
      }, 0);
      
      // Unlock the next challenge if available
      if (currentIndex < this.challenges.length - 1) {
        this.challenges[currentIndex + 1].status = 'active';
      }
      
      // Emit completion event
      this.challengeCompleted.emit(this.selectedChallenge.type);
      
      // Reset selection
      this.selectedChallenge = null;
    }
  }

  // Helper method to check if all challenges are completed
  get allChallengesCompleted(): boolean {
    return this.challenges.every(challenge => challenge.status === 'completed');
  }
}