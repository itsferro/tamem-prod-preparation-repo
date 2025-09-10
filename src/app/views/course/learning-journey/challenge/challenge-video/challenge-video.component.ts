import { Component, Input, Output, EventEmitter, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntroComponent } from '../intro/intro.component';
import { ResultComponent } from '../result/result.component';

@Component({
  selector: 'journey-challenge-video',
  standalone: true,
  imports: [
    CommonModule,
    IntroComponent,
    ResultComponent
  ],
  templateUrl: './challenge-video.component.html',
  styleUrl: './challenge-video.component.scss'
})
export class ChallengeVideoComponent implements OnInit, OnDestroy {
  @Input() currentStep!: any; 
  @Input() challengeData: any;
  
  @Output() subChallengeResponse = new EventEmitter<any>();
  
  @ViewChild('videoPlayer') videoPlayer?: ElementRef<HTMLVideoElement>;
  
  videoLoaded = false;
  videoStarted = false;
  videoCompleted = false;
  watchTime = 0;
  videoPosition: number = 0;
  isLoading: boolean = false;

  currentState: 'intro' | 'watching' | 'complete' = 'intro';
  
  private watchTimer: any;
  
  ngOnInit() {
    this.currentState = 'intro';
    
    // Set default mode for video challenges
    if (this.currentStep && !this.currentStep.currentMode) {
      this.currentStep.currentMode = 'view';
    }
  }
  
  ngOnDestroy(): void {
    this.stopWatchTimer();
  }
  
  // Called from IntroComponent
  startChallenge(event: {mode?: 'practice' | 'test' | 'view'}): void {
    // For video challenges, we always use 'view' mode
    // This ensures it works regardless of what the intro passes
    if (this.currentStep) {
      this.currentStep.currentMode = 'view';
    }
    
    this.startVideo();
  }
  
  startVideo(): void {
    this.currentState = 'watching';
    this.loadVideo();
    this.startWatchTimer();
    
    setTimeout(() => {
      if (this.videoPlayer?.nativeElement) {
        this.videoPlayer.nativeElement.play()
          .catch(error => console.error('Error auto-playing video:', error));
      }
    }, 100);
  }
  
  loadVideo() {
    this.videoLoaded = true;
  }
  
  onVideoPlay(): void {
    this.videoStarted = true;
    this.startWatchTimer();
  }
  
  onVideoPause(): void {
    this.stopWatchTimer();
  }
  
  onVideoEnded(): void {
    this.stopWatchTimer();
    this.markAsComplete(true); // Fully completed when ended
  }
  
  startWatchTimer(): void {
    if (!this.watchTimer) {
      this.watchTimer = setInterval(() => {
        this.watchTime++;
      }, 1000);
    }
  }
  
  stopWatchTimer(): void {
    if (this.watchTimer) {
      clearInterval(this.watchTimer);
      this.watchTimer = null;
    }
  }
  
  // Called when the user marks the video as watched
  markAsComplete(fullyWatched: boolean = false) {
    // Store current playback position before stopping
    if (this.videoPlayer?.nativeElement) {
      this.videoPosition = this.videoPlayer.nativeElement.currentTime;
    }
    
    this.videoCompleted = true;
    this.currentState = 'complete';
    this.stopWatchTimer();
  }
  
  // Determine if minimum view requirements are met
  get viewRequirementsMet(): boolean {
    // Skip rules if not applying them
    if (!this.currentStep?.resourceData?.applyWatchingRules) {
      return true;
    }
    
    const minWatchTime = this.currentStep?.resourceData?.minimumViewTime || 0;
    const requireFullView = this.currentStep?.resourceData?.requireFullView || false;
    
    // If full view required, check if video ended
    if (requireFullView) {
      return this.videoPlayer?.nativeElement?.ended || false;
    }
    
    // Otherwise check minimum time
    return this.watchTime >= minWatchTime;
  }
  
  // Get remaining time needed
  get remainingWatchTime(): number {
    const minWatchTime = this.currentStep?.resourceData?.minimumViewTime || 0;
    return Math.max(0, minWatchTime - this.watchTime);
  }
  
  // Called from the result component
  onFinishChallenge(): void {
    this.subChallengeResponse.emit({
      context: 'challenge-complete',
      data: {
        completed: this.viewRequirementsMet, // Only mark as truly completed if requirements are met
        score: this.viewRequirementsMet ? 100 : 0,
        timeSpent: this.watchTime
      }
    });
  }
  
  // Called from the result component
  onRetryChallenge(): void {
    this.resumeWatching();
  }
  
  formatDuration(seconds: number): string {
    if (!seconds) return '0:00';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
  
  // Resume video watching from where left off
  resumeWatching(): void {
    this.currentState = 'watching';
    
    // Wait for the video player to be available in the DOM
    setTimeout(() => {
      if (this.videoPlayer?.nativeElement) {
        // Set the playback position to where they left off
        this.videoPlayer.nativeElement.currentTime = this.videoPosition;
        // Start playing
        this.videoPlayer.nativeElement.play()
          .catch(error => console.error('Error resuming video:', error));
      }
    }, 100);
  }



  // Helper to ensure the step is correctly identified as a video
getVideoStep() {
  if (this.currentStep) {
    // Create a copy of currentStep with type explicitly set to 'video'
    return { ...this.currentStep, type: 'video' };
  }
  return this.currentStep;
}

 
// Add to challenge-video.component.ts

// Method to handle exit from intro
onExitChallenge(): void {
  this.subChallengeResponse.emit({
    context: 'challenge-exit',
    data: {
      completed: false,
      mode: 'view'
    }
  });
}



}