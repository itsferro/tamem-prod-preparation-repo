import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

// Import all required components
import { KnowledgeCheckComponent } from '../knowledge-check/knowledge-check.component';
import { TermMatchingComponent } from '../term-matching/term-matching.component';
import { ProcessOrderingComponent } from '../process-ordering/process-ordering.component';
import { PartsIdentificationComponent } from '../parts-identification/parts-identification.component';
import { ApplicationSenarioComponent } from '../application-senario/application-senario.component';
import { ConceptMapComponent } from '../concept-map/concept-map.component';
import { ChallangesBoxComponent } from '../challanges-box/challanges-box.component';

interface ActivityStep {
  id: number;
  type: 'knowledge-check' | 'term-matching' | 'process-ordering' | 
        'parts-identification' | 'application-scenario' | 'concept-map' | 
        'challenges-box' | 'completion';
  title: string;
  description: string;
  completed: boolean;
  score?: number;
  maxScore?: number;
}

@Component({
  selector: 'detail-learning-journey',
  standalone: true,
  imports: [
    CommonModule,
    KnowledgeCheckComponent,
    TermMatchingComponent,
    ProcessOrderingComponent,
    PartsIdentificationComponent,
    ApplicationSenarioComponent,
    ConceptMapComponent,
    ChallangesBoxComponent
  ],
  templateUrl: './learning-journey.component.html',
  styleUrl: './learning-journey.component.scss'
})
export class LearningJourneyComponent implements OnInit {
  @Input() lesson: any;
  @Input() currentBlock: any;

  // Active modal injection for modal interactions
  private activeModal = inject(NgbActiveModal);

  // Optional outputs for component-based usage
  @Output() journeyCompleted = new EventEmitter<{
    blockId: number;
    completed: boolean;
    totalScore: number;
    maxScore: number;
  }>();

  @Output() returnToLesson = new EventEmitter<void>();

  // State management properties
  currentStepIndex: number = 0;
  totalScore: number = 0;
  maxScore: number = 0;
  progress: number = 0;
  isCompleted: boolean = false;

  // Journey steps configuration
  activitySteps: ActivityStep[] = [];

  constructor() {}

  ngOnInit(): void {
    this.initializeJourney();
  }

  initializeJourney(): void {
    // Existing journey steps configuration
    this.activitySteps = [
      {
        id: 1,
        type: 'knowledge-check',
        title: 'اختبار المعرفة الأساسية',
        description: 'اختبر معرفتك الأساسية بالمفاهيم المقدمة في هذا الدرس.',
        completed: false,
        maxScore: 15
      },
      {
        id: 2,
        type: 'term-matching',
        title: 'مطابقة المصطلحات',
        description: 'قم بمطابقة المصطلحات مع تعريفاتها الصحيحة.',
        completed: false,
        maxScore: 15
      },
      {
        id: 3,
        type: 'process-ordering',
        title: 'ترتيب العمليات',
        description: 'رتب الخطوات في التسلسل الصحيح.',
        completed: false,
        maxScore: 20
      },
      {
        id: 4,
        type: 'parts-identification',
        title: 'تحديد الأجزاء',
        description: 'حدد الأجزاء المختلفة في الصورة.',
        completed: false,
        maxScore: 15
      },
      {
        id: 5,
        type: 'application-scenario',
        title: 'سيناريو التطبيق',
        description: 'طبق المعرفة التي اكتسبتها في مواقف حقيقية.',
        completed: false,
        maxScore: 20
      },
      {
        id: 6,
        type: 'concept-map',
        title: 'خريطة المفاهيم',
        description: 'أكمل خريطة المفاهيم بوضع المفاهيم في الأماكن الصحيحة.',
        completed: false,
        maxScore: 15
      },
      {
        id: 7,
        type: 'completion',
        title: 'اكتمال الرحلة التعليمية',
        description: 'تهانينا! لقد أكملت جميع الأنشطة لهذه الوحدة.',
        completed: false
      }
    ];

    // Calculate maximum possible score
    this.maxScore = this.activitySteps.reduce((sum, step) => sum + (step.maxScore || 0), 0);

    // Update initial progress
    this.updateProgress();
  }

  get currentStep(): ActivityStep {
    return this.activitySteps[this.currentStepIndex];
  }

  onActivityCompleted(result: any): void {
    // Update current step as completed
    this.activitySteps[this.currentStepIndex].completed = true;

    // Calculate score
    let score = 0;
    if (typeof result === 'number') {
      score = result;
    } else if (typeof result === 'object') {
      score = result.score || result.totalScore || 0;
    }

    // Set step score and update total
    this.activitySteps[this.currentStepIndex].score = score;
    this.totalScore += score;

    // Update progress
    this.updateProgress();

    // Move to next step or complete journey
    if (this.currentStepIndex < this.activitySteps.length - 1) {
      this.currentStepIndex++;
    } else {
      this.completeJourney();
    }
  }

  completeJourney(): void {
    this.isCompleted = true;

    // Close modal with journey results
    this.activeModal.close({
      blockId: this.currentBlock?.id,
      completed: true,
      totalScore: this.totalScore,
      maxScore: this.maxScore
    });

    // Optional: Emit event for potential parent component usage
    this.journeyCompleted.emit({
      blockId: this.currentBlock?.id,
      completed: true,
      totalScore: this.totalScore,
      maxScore: this.maxScore
    });
  }

  // Methods to handle modal interactions
  cancelJourney(): void {
    this.activeModal.dismiss('journey_cancelled');
  }

  closeJourney(): void {
    this.activeModal.close({
      blockId: this.currentBlock?.id,
      completed: false,
      totalScore: this.totalScore,
      maxScore: this.maxScore
    });
  }

  // Existing utility methods
  updateProgress(): void {
    const completedSteps = this.activitySteps.filter(step => step.completed).length;
    const totalSteps = this.activitySteps.length - 1;
    this.progress = (completedSteps / totalSteps) * 100;
  }

  // Development helper method
  devSkipStep(): void {
    this.activitySteps[this.currentStepIndex].completed = true;

    const defaultScore = this.currentStep.maxScore || 10;
    this.activitySteps[this.currentStepIndex].score = defaultScore;
    this.totalScore += defaultScore;

    this.updateProgress();

    if (this.currentStepIndex < this.activitySteps.length - 1) {
      this.currentStepIndex++;
    } else {
      this.completeJourney();
    }
  }

  onReturnToLesson(): void {
    // Emit the return event (for component-based usage)
   // this.returnToLesson.emit();
  
    // Close the modal with a specific dismiss reason
    this.activeModal.dismiss('returned_to_lesson');
  }


  /**
 * Navigate to a specific step (if accessible)
 */
goToStep(index: number): void {
  // Only allow navigation to:
  // 1. Completed steps 
  // 2. Current step
  // 3. Next step if current step is completed
  if (index < this.currentStepIndex ||
    (index === this.currentStepIndex) ||
    (index === this.currentStepIndex + 1 && this.activitySteps[this.currentStepIndex].completed)) {
    this.currentStepIndex = index;
  }
}


// In the component
isStepAccessible(index: number): boolean {
  // Ensure index is within bounds and handle first step specially
  if (index < 0 || index >= this.activitySteps.length) {
    return false;
  }

  // First step is always accessible
  if (index === 0) {
    return true;
  }

  // Can go to current or previous steps
  if (index <= this.currentStepIndex) {
    return true;
  }

  // Can go to next step only if current step is completed
  return index === this.currentStepIndex + 1 && 
         this.activitySteps[this.currentStepIndex].completed;
}


}