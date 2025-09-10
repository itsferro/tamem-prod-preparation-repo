import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'challenge-intro',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './intro.component.html',
  styleUrl: './intro.component.scss'
})
export class IntroComponent implements OnInit {
  @Input() currentStep: any;
  @Input() questionData: any;
  @Input() isLoading: boolean = false;

  // Event emitted when user selects a mode and starts the challenge
  @Output() startChallenge = new EventEmitter<{mode?: 'practice' | 'test' | 'view'}>();
  
  @Output() exitChallenge = new EventEmitter<void>();

  

  // Internal properties
  isVideoChallenge: boolean = false;
  
  ngOnInit() {
    // Check if this is a video challenge
    this.isVideoChallenge = this.currentStep?.type === 'video';

    // For non-video challenges, reset the mode to force selection
    if (!this.isVideoChallenge && this.currentStep) {
      // Store the original mode temporarily but don't use it for display
      this.currentStep._originalMode = this.currentStep.currentMode;
      // Reset the current mode to undefined to force selection
      this.currentStep.currentMode = undefined;
    }
  }
  
  /**
   * Start the challenge with the selected mode
   * @param mode Selected mode (practice or test or view for videos)
   */
  onStartChallenge(mode?: 'practice' | 'test' | 'view') {
    this.startChallenge.emit({ mode });
  }
  
  /**
   * Format seconds into MM:SS display
   */
  formatDuration(seconds: number): string {
    if (!seconds) return '0:00';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  onExitIntro(): void {
    this.exitChallenge.emit();
  }
  
}