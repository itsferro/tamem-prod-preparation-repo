import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChallengeVideoComponent } from './challenge-video/challenge-video.component';
import { ChallengeMcqComponent } from './challenge-mcq/challenge-mcq.component';
import { IntroComponent } from './intro/intro.component';
import { ResultComponent } from './result/result.component';
import { ChallengeMcqOptionsComponent } from './challenge-mcq-options/challenge-mcq-options.component';
import { ChallengeQuranComponent } from './challenge-quran/challenge-quran.component';

@Component({
  selector: 'journey-challenge',
  standalone: true,
  imports: [
    CommonModule,
    ChallengeVideoComponent,
    ChallengeMcqComponent,
    IntroComponent,
    ResultComponent,
    ChallengeMcqOptionsComponent,
    ChallengeQuranComponent
  ],
  templateUrl: './challenge.component.html',
  styleUrl: './challenge.component.scss'
})
export class ChallengeComponent implements OnInit {
  @Input() currentStep: any;
  @Input() messageResponse: any; // To receive responses from message component
  @Input() blockData : any ; 

   
  @Output() challengeResponse = new EventEmitter<any>();

  // Track the active challenge type
  activeComponentType: string = '';
  challengeData: any; 

  ngOnInit() {
    this.loadChallenge();
  }

  loadChallenge() {
    this.challengeData = ''; 
    this.activeComponentType = this.currentStep.type; // this will activate in the html which challenge comp to show based on type
  }

  // Handle responses from specific challenge components
// Handle responses from specific challenge components
onSubChallengeResponse(response: any) {
  // If this is a test response and the user didn't pass, modify the response
  // to indicate that the challenge should not be marked as complete for progression
  if (response.context === 'challenge-complete' && 
      response.data.mode === 'test' && 
      !response.data.passed) {
    
    // Modify the response to indicate that the challenge is not truly completed
    // This prevents unlocking the next challenge
    const modifiedResponse = {
      ...response,
      data: {
        ...response.data,
        completed: false  // Override the completed flag to false
      }
    };
    
    // Forward the modified response to the parent component
    this.challengeResponse.emit(modifiedResponse);
  } else {
    
    // Forward the original response to the parent component
    this.challengeResponse.emit(response);
  }
}

}