import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, moveItemInArray , DragDropModule} from '@angular/cdk/drag-drop';
 


interface ProcessStep {
  id: number;
  text: string;
  correctPosition: number;
  userPosition: number;
  image?: string;
  isCorrectPosition?: boolean;
}


@Component({
  selector: 'detail-process-ordering',
  standalone: true,
  imports: [
    CommonModule, DragDropModule
    
  ],
  templateUrl: './process-ordering.component.html',
  styleUrl: './process-ordering.component.scss',
})
export class ProcessOrderingComponent implements OnInit {
  @Input() lessonId: number = 0;
  @Input() challengeId: number = 0;
  @Output() challengeCompleted = new EventEmitter<{
    score: number;
    totalPossible: number;
    passed: boolean;
  }>();

  correctSteps: ProcessStep[] = [];
  userOrderedSteps: ProcessStep[] = [];
  
  isVerifying: boolean = false;
  isCompleted: boolean = false;
  allCorrect: boolean = false;
  
  attempts: number = 0;
  score: number = 0;
  maxScore: number = 20; // Total possible points for this challenge

  constructor() {}

  ngOnInit(): void {
    this.loadProcessSteps();
    this.shuffleSteps();
  }

  loadProcessSteps(): void {
    // In a real app, fetch from API based on lessonId and challengeId
    this.correctSteps = [
      {
        id: 1,
        text: 'امتصاص الضوء بواسطة الكلوروفيل في البلاستيدات الخضراء',
        correctPosition: 0,
        userPosition: 0,
        image: 'assets/images/photosynthesis/step1.jpg'
      },
      {
        id: 2,
        text: 'تحويل الطاقة الضوئية إلى طاقة كيميائية',
        correctPosition: 1,
        userPosition: 0,
        image: 'assets/images/photosynthesis/step2.jpg'
      },
      {
        id: 3,
        text: 'تحليل جزيئات الماء وإنتاج الأكسجين',
        correctPosition: 2,
        userPosition: 0
      },
      {
        id: 4,
        text: 'نقل الإلكترونات عبر سلسلة نقل الإلكترون',
        correctPosition: 3,
        userPosition: 0
      },
      {
        id: 5,
        text: 'تثبيت ثاني أكسيد الكربون في دورة كالفن',
        correctPosition: 4,
        userPosition: 0
      },
      {
        id: 6,
        text: 'إنتاج الجلوكوز واستخدامه أو تخزينه في النبات',
        correctPosition: 5,
        userPosition: 0,
        image: 'assets/images/photosynthesis/step6.jpg'
      }
    ];
  }

  shuffleSteps(): void {
    // Create a copy of the correct steps
    const stepsCopy = JSON.parse(JSON.stringify(this.correctSteps));
    
    // Shuffle the copy
    this.shuffleArray(stepsCopy);
    
    // Set user positions
    stepsCopy.forEach((step: { userPosition: any; }, index: any) => {
      step.userPosition = index;
    });
    
    this.userOrderedSteps = stepsCopy;
  }

  // Fisher-Yates (Knuth) shuffle algorithm
  shuffleArray(array: any[]): void {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  onDrop(event: CdkDragDrop<ProcessStep[]>): void {
    // Update the array order
    moveItemInArray(this.userOrderedSteps, event.previousIndex, event.currentIndex);
    
    // Update user positions
    this.userOrderedSteps.forEach((step, index) => {
      step.userPosition = index;
    });
  }

  verifyOrder(): void {
    this.isVerifying = true;
    this.attempts++;
    
    let correctCount = 0;
    
    // Check each step's position
    this.userOrderedSteps.forEach(step => {
      // Compare user position with correct position
      step.isCorrectPosition = step.userPosition === step.correctPosition;
      
      if (step.isCorrectPosition) {
        correctCount++;
      }
    });
    
    this.allCorrect = correctCount === this.userOrderedSteps.length;
    
    // Calculate score based on attempts and correct positions
    if (this.allCorrect) {
      // Base score starts at max and decreases with each attempt
      this.score = Math.max(5, this.maxScore - ((this.attempts - 1) * 5));
    }
  }

  tryAgain(): void {
    this.isVerifying = false;
    
    // Reset correct position indicators
    this.userOrderedSteps.forEach(step => {
      step.isCorrectPosition = undefined;
    });
  }

  resetOrder(): void {
    this.shuffleSteps();
    this.isVerifying = false;
  }

  completeChallenge(): void {
    this.isCompleted = true;
  }

  retryChallenge(): void {
    // Reset everything
    this.shuffleSteps();
    this.isVerifying = false;
    this.isCompleted = false;
    this.allCorrect = false;
    this.attempts = 0;
    this.score = 0;
  }

  finishChallenge(): void {
    const totalPossible = this.maxScore;
    const passed = this.score >= (totalPossible * 0.5); // 50% to pass
    
    this.challengeCompleted.emit({
      score: this.score,
      totalPossible,
      passed
    });
  }

  getProgressPercentage(): number {
    if (this.isCompleted) {
      return 100;
    } else if (this.isVerifying) {
      return 50;
    } else {
      return 25;
    }
  }

  getScoreMessage(): string {
    const percentage = (this.score / this.maxScore) * 100;
    
    if (percentage >= 90) {
      return 'ممتاز! لقد أظهرت فهماً ممتازاً لتسلسل عملية التمثيل الضوئي.';
    } else if (percentage >= 70) {
      return 'جيد جداً! فهمك للعملية جيد، لكن قد تحتاج لمراجعة بعض التفاصيل.';
    } else if (percentage >= 50) {
      return 'جيد! يمكنك تحسين معرفتك بتسلسل خطوات التمثيل الضوئي.';
    } else {
      return 'تحتاج إلى مزيد من الدراسة لفهم تسلسل خطوات التمثيل الضوئي بشكل أفضل.';
    }
  }
}