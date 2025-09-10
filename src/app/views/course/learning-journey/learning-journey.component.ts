// learning-journey.component.ts
import { Component, OnInit, Input, inject } from '@angular/core';
import { LearningJourneyService } from './learning-journey.service';
import { JourneyStep } from './learning-journey-interface';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';



// Import child components
import { StepperComponent } from './stepper/stepper.component';
import { MessageComponent } from './message/message.component';
import { ScoreComponent } from './score/score.component';
import { ChallengeVideoComponent } from './challenge/challenge-video/challenge-video.component';
import { ChallengeComponent } from './challenge/challenge.component';
import { TamemService } from '@/app/core/service/tamem-service.service';
import { MapComponent } from './map/map.component';

// In learning-journey.component.ts
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-learning-journey',
  templateUrl: './learning-journey.component.html',
  styleUrls: ['./learning-journey.component.scss'],
  imports: [
    StepperComponent,
    MessageComponent,
    ChallengeComponent,
    ScoreComponent,
    ChallengeVideoComponent,
    MapComponent
  ],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
    ]),
  ],
  standalone: true
})
export class LearningJourneyComponent implements OnInit {
  @Input() lesson: any;
  @Input() block: any;

  private tamemService = inject(TamemService);
  private journeyService = inject(LearningJourneyService);
  private activeModal = inject(NgbActiveModal); // Add this line

  showJourneyIntro: boolean = true;

  // showIntro = true;

  // showCompletionMessage = false;
  // lastScore: any;
  // steps: any[] = [];  
  // currentChallenge: any;

  journeyData: any | null = null;
  activeComponentType: string = '';
  currentStepIndex = 0;
  currentMode = 'practice';
  currentChallengeData: any;

  showChallenge: boolean = true;
  showMessage: boolean = false;
  messageTemplate: string = '';
  messageData: any = null;

  ngOnInit(): void {

    // Call your loadJourneySteps function
    this.loadJourneySteps();

  }


  loadJourneySteps() {

    if (this.block && this.block.id) {
      this.tamemService.getBlockJourneySteps(this.block.id).subscribe({
        next: (data) => {
          this.journeyData = data;
          this.currentStepIndex = data.currentStepIndex || 0;

          // Show intro first, not the challenge yet
          this.showJourneyIntro = true;
          this.showChallenge = false;
        },
        error: (err) => {
          console.error('Error loading journey data:', err);
        }
      });
    }
  }


  // Add a method to start the journey after intro
  startJourneyFromIntro(): void {
    this.showJourneyIntro = false;
    this.startJourney();
  }


  startJourney(): void {

    if (!this.journeyData || this.journeyData.steps.length === 0) {
      console.error('No journey data available');
      return;
    }

    // Set the current step index (usually 0 for first step)
    this.currentStepIndex = this.journeyData.currentStepIndex || 0;
    // Mark journey as started
    if (!this.journeyData.journeyStartedAt) {
      this.journeyData.journeyStartedAt = new Date();
      // Update the learning journey service with this information
      this.journeyService.updateJourney(this.journeyData);
    }
    // Load the current step
    this.loadCurrentStep();
  }


  // In learning-journey.component.ts
  loadCurrentStep(): void {
    if (!this.journeyData) return;

    // Just get the current step and pass it to the challenge component
    // No need to set activeComponentType or handle different challenge types here
    const currentStep = this.journeyData.steps[this.currentStepIndex];

    // Mark current step as in progress if not already started
    if (currentStep.status === 'not_started') {
      currentStep.status = 'in_progress';
      currentStep.startedAt = new Date();

      // Update the step in the journey service
      this.journeyService.updateStep(currentStep.stepId, {
        status: 'in_progress',
        startedAt: currentStep.startedAt
      });
    }

    // Show the challenge component
    this.showChallenge = true;
    this.showMessage = false;
  }




  // Add to learning-journey.component.ts
  onMessageResponse(response: any): void {

    alert(`You selected: ${response.selectedResponse}  response`);

    switch (response.context) {
      case 'journey-intro':
        //  this.currentMode = response.selectedOption;
        //  this.startJourney();
        break;

      case 'challenge-complete':
        // Handle challenge completion response
        switch (response.selectedOption) {
          case 'next':
            // this.nextChallenge();
            break;
          case 'repeat':
            // this.repeatChallenge();
            break;
        }
        break;

      case 'practice-result':
        // Handle practice results
        if (response.selectedOption === 'test') {
          // this.switchToTestMode();
        } else {
          // this.continuePractice();
        }
        break;

      // Can easily add more cases for different contexts
      default:
        console.warn('Unknown message context:', response.context);
    }

  }


  onChallengeResponse(response: any): void {
    if (response.context === 'challenge-complete') {
      // Get the current step
      const currentStep = this.journeyData.steps[this.currentStepIndex];

      // Update step status to completed
      currentStep.status = 'completed';
      currentStep.completedAt = new Date();

      // If score was provided, update it
      if (response.score !== undefined) {
        if (currentStep.currentMode === 'practice') {
          currentStep.practiceScore = response.score;
        } else if (currentStep.currentMode === 'test') {
          currentStep.testScore = response.score;
        }
      }

      // Update the step in the service
      this.journeyService.updateStep(currentStep.stepId, {
        status: 'completed',
        completedAt: currentStep.completedAt,
        practiceScore: currentStep.practiceScore,
        testScore: currentStep.testScore
      });

      // Return to the map view instead of going to the next challenge
      this.showChallenge = false;
      this.showJourneyIntro = true;

      // Check if all steps are complete
      const allCompleted = this.journeyData.steps.every((step: JourneyStep) => step.status === 'completed');

      if (allCompleted) {
        // Mark journey as completed
        this.journeyData.journeyCompletedAt = new Date();
        this.journeyService.updateJourney(this.journeyData);
      }

      // If there's a next step, increment the currentStepIndex to focus on it
      if (this.currentStepIndex < this.journeyData.steps.length - 1) {
        this.currentStepIndex++;
        this.journeyData.currentStepIndex = this.currentStepIndex;

        // Also update the journey data in the service
        this.journeyService.updateJourney(this.journeyData);
      }
    }


    //challenge-exit
    if (response.context === 'challenge-exit') {
      
      this.showChallenge = false;
      this.showJourneyIntro = true;

    }


  }


  onMapNodeSelected(stepIndex: number): void {
    // Get the step the user clicked on
    const step = this.journeyData.steps[stepIndex];

    // Check if the step is unlocked (this would be determined by the map component's rendering logic)
    // If the user was able to click it, we assume it's unlocked

    // Set this as the current step
    this.currentStepIndex = stepIndex;
    this.journeyData.currentStepIndex = stepIndex;

    // Start the journey with this step
    this.startJourneyFromIntro();
  }


  onExitJourney(): void {

    this.activeModal.close('closed'); // This will close the modal

  }

  // In learning-journey.component.ts, add:
  onRetakeChallenge(stepIndex: number): void {
    // Get the step to be retaken
    const step = this.journeyData.steps[stepIndex];

    // Update the step status to in_progress
    step.status = 'in_progress';

    // Reset attempt count based on the mode
    if (step.currentMode === 'practice') {
      step.practiceAttempts += 1;
    } else if (step.currentMode === 'test') {
      step.testAttempts += 1;
    }

    // Update the step in the service
    this.journeyService.updateStep(step.stepId, {
      status: 'in_progress',
      practiceAttempts: step.practiceAttempts,
      testAttempts: step.testAttempts
    });

    // Set the current step index
    this.currentStepIndex = stepIndex;
    this.journeyData.currentStepIndex = stepIndex;

    // Show the challenge
    this.showJourneyIntro = false;
    this.showChallenge = true;

    // Load the challenge
    this.loadCurrentStep();
  }


}