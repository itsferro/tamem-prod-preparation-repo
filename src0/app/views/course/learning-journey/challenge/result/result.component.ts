import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'challenge-result',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './result.component.html',
  styleUrl: './result.component.scss'
})
export class ResultComponent {
  @Input() currentStep: any;
  @Input() score: number = 0;
  @Input() totalCorrect: number = 0;
  @Input() totalQuestions: number = 0;
  @Input() mode: 'practice' | 'test' | 'view' = 'practice';
  
  // Set the passing score threshold
  @Input() passingScore: number = 70;
  
  @Output() retryChallenge = new EventEmitter<void>();
  @Output() finishChallenge = new EventEmitter<void>();
  @Output() exitChallenge = new EventEmitter<void>();
  
  /**
   * Retry the challenge with the same mode
   */
  onRetryChallenge() {
    this.retryChallenge.emit();
  }
  
  /**
   * Complete the challenge and move to the next step
   * In test mode, this button will be disabled if score is below passing score
   */
  onFinishChallenge() {
    this.finishChallenge.emit();
  }
  
  /**
   * Exit the challenge without progressing to the next one
   * Used in practice mode to return to the map/journey view
   */
  onExitChallenge() {
    
    this.exitChallenge.emit();
  }
  
  /**
   * Generate a random color for confetti
   */
  getRandomColor(index: number): string {
    const colors = [
      '#FF5252', '#FF4081', '#E040FB', '#7C4DFF',
      '#536DFE', '#448AFF', '#40C4FF', '#18FFFF',
      '#64FFDA', '#69F0AE', '#B2FF59', '#EEFF41',
      '#FFFF00', '#FFD740', '#FFAB40', '#FF6E40'
    ];
    return colors[index % colors.length];
  }
}