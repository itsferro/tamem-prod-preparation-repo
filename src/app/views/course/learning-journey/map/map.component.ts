// map.component.ts
import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JourneyStep } from '../learning-journey-interface';

@Component({
  selector: 'journey-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements OnChanges, OnInit {
  @Input() steps: JourneyStep[] = [];
  @Input() currentStepIndex: number = 0;
  @Input() lessonTitle: string = 'رحلة التعلم';
  
  @Output() nodeSelected = new EventEmitter<number>();
  @Output() retake = new EventEmitter<number>();
  @Output() exitJourney = new EventEmitter<void>();
  
  completedChallenges = 0;
  totalChallenges = 0;
  currentScore = 0;
  totalPossibleScore = 0;
  progressPercentage = 0;

  // In map.component.ts
newlyUnlockedIndex: number | null = null;

  ngOnInit(): void {
    this.updateProgress();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['steps'] || changes['currentStepIndex']) {
      this.updateProgress();

      this.updateNewlyUnlocked();

    }
  }

  getDifficultyText(step: JourneyStep): string {
    return step.typeText || step.type;
  }

  getIconForType(step: JourneyStep): string {
    return step.typeIcon || 'fa-star';
  }

  getDifficultyLevel(step: JourneyStep): 'easy' | 'medium' | 'hard' {
    if (step.difficulty) return step.difficulty as 'easy' | 'medium' | 'hard';
    
    const stepsCount = this.steps.length;
    
    if (step.stepNo <= stepsCount / 3) {
      return 'easy';
    } else if (step.stepNo <= (stepsCount * 2) / 3) {
      return 'medium';
    } else {
      return 'hard';
    }
  }

  getPoints(step: JourneyStep): number {
    if (step.points !== undefined) return step.points;
    
    const basePoints = 10;
    const difficultyMultiplier = this.getDifficultyLevel(step) === 'easy' ? 1 : 
                               this.getDifficultyLevel(step) === 'medium' ? 1.5 : 2;
    
    return Math.round(basePoints * difficultyMultiplier);
  }

  // New method to get the current score of a step
  getStepScore(step: JourneyStep): number {
    if (step.testScore !== undefined) return step.testScore;
    if (step.practiceScore !== undefined) return step.practiceScore;
    return 0;
  }

  isStepLocked(stepIndex: number): boolean {
    // If this is the first step, it's always unlocked
    if (stepIndex === 0) {
      return false;
    }
    
    // If this step is already completed or in progress, it's unlocked
    if (this.steps[stepIndex].status === 'completed' || 
        this.steps[stepIndex].status === 'in_progress') {
      return false;
    }
    
    // Check if the previous step is completed - if yes, this step should be unlocked
    const previousStepIndex = stepIndex - 1;
    if (previousStepIndex >= 0 && this.steps[previousStepIndex].status === 'completed') {
      return false;
    }
    
    // All other steps should be locked
    return true;
  }

  startChallenge(stepIndex: number): void {

    if (!this.isStepLocked(stepIndex)) {
      this.nodeSelected.emit(stepIndex);
    }
  }

  // New method for retaking a challenge
  retakeChallenge(stepIndex: number): void {
    this.retake.emit(stepIndex);
  }

 
  updateProgress(): void {
    if (!this.steps || this.steps.length === 0) return;
    
    this.totalChallenges = this.steps.length;
    this.completedChallenges = this.steps.filter(step => step.status === 'completed').length;
    this.progressPercentage = (this.completedChallenges / this.totalChallenges) * 100;
    
    // Calculate current score from completed challenges
    this.currentScore = this.steps
      .filter(step => step.status === 'completed')
      .reduce((total, step) => {
        return total + this.getStepScore(step);
      }, 0);
    
    // Calculate total possible score
    this.totalPossibleScore = this.steps.reduce((total, step) => {
      return total + (step.points || this.getPoints(step));
    }, 0);
  }


  onExitJourney(): void {
    this.exitJourney.emit();
  }


  // This could be added to ngOnChanges or a separate method
updateNewlyUnlocked(): void {
  // Find the last completed step
  const lastCompletedIndex = this.steps.findIndex((step, i, arr) => 
    step.status === 'completed' && 
    (i === arr.length - 1 || arr[i + 1].status !== 'completed')
  );
  
  // If there's a next step, mark it as newly unlocked
  if (lastCompletedIndex >= 0 && lastCompletedIndex < this.steps.length - 1) {
    this.newlyUnlockedIndex = lastCompletedIndex + 1;
  } else {
    this.newlyUnlockedIndex = null;
  }
}



}