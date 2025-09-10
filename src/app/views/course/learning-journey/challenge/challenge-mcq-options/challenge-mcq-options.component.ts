import { Component, EventEmitter, Input, Output, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription, interval } from 'rxjs';
import { TamemService } from '@/app/core/service/tamem-service.service';
import { IntroComponent } from '../intro/intro.component';
import { ResultComponent } from '../result/result.component';

@Component({
  selector: 'journey-challenge-mcq-options',
  standalone: true,
  imports: [
    CommonModule,
    IntroComponent,
    ResultComponent
  ],
  templateUrl: './challenge-mcq-options.component.html',
  styleUrls: ['./challenge-mcq-options.component.scss']
})
export class ChallengeMcqOptionsComponent implements OnInit, OnDestroy {
  @Input() currentStep!: any;
  @Input() challengeData!: any;
  @Input() mode: 'practice' | 'test' | 'view' = 'practice';

  @Output() subChallengeResponse = new EventEmitter<any>();

  atob = atob; // Make the global atob function available to the template

  private tamemService = inject(TamemService);
  private timerSubscription: Subscription | null = null;

  // Challenge states
  currentState: 'intro' | 'questions' | 'complete' = 'intro';
  questionData: any = null;
  isLoading: boolean = true;

  // Track current question and answers
  currentQuestionIndex: number = 0;
  userAnswers: { [questionId: string]: string } = {};
  questionResults: { [questionId: string]: boolean } = {};
  showAnswers: boolean = false;
  isCorrect: boolean = false;

  // Score tracking
  totalCorrect: number = 0;
  score: number = 0;

  // Timer for test mode
  remainingTime: string = '00:00';
  totalTimeInSeconds: number = 600; // 10 minutes default
  currentTimeInSeconds: number = 600;

  ngOnInit() {
    // Start with intro state
    this.currentState = 'intro';

    // If mode is not set (undefined), show intro to let user select mode
    if (!this.currentStep.currentMode) {
      // Will show mode selection in the intro
    } else {
      // Mode is already set, load with that mode
      this.mode = this.currentStep.currentMode as 'practice' | 'test';
    }

    // Load question data
    this.loadQuestionData();
  }

  ngOnDestroy() {
    this.stopTimer();
  }

  // Load MCQ data from service
  loadQuestionData() {
    this.isLoading = true;

    this.tamemService.getMcqChallengeData(this.currentStep.challengeId).subscribe({
      next: (data) => {
        this.questionData = data;
        this.isLoading = false;

        // Set timer based on question count (2 minutes per question with max 10 minutes)
        const questionCount = data.questions?.length || 5;
        this.totalTimeInSeconds = Math.min(questionCount * 120, 600);
        this.currentTimeInSeconds = this.totalTimeInSeconds;
        this.updateTimerDisplay();
      },
      error: (err) => {
        console.error('Error loading MCQ data:', err);
        this.isLoading = false;
      }
    });
  }

  // Start the challenge - called from IntroComponent
  startChallenge(event: {mode?: 'practice' | 'test' | 'view'}) {
    // Make sure we have a valid mode for MCQ (practice or test only)
    if (!event.mode || event.mode === 'view') {
      console.error('MCQ challenges require practice or test mode');
      return;
    }
    
    this.mode = event.mode;

    // Update the current step mode
    if (this.currentStep) {
      this.currentStep.currentMode = event.mode;
    }

    this.currentState = 'questions';
    this.currentQuestionIndex = 0;
    this.userAnswers = {};
    this.questionResults = {};
    this.showAnswers = false;
    this.totalCorrect = 0;
    this.score = 0;

    // Start timer for test mode
    if (this.mode === 'test') {
      this.startTimer();
    }
  }

  // Answer the current question (only registers the selection, doesn't check for correctness)
  answerQuestion(questionId: string, answerId: string) {
    // Don't allow answer changes if answers are shown
    if (this.showAnswers) return;

    // Store the user's answer
    this.userAnswers[questionId] = answerId;
    
    // In test mode, automatically check the answer and move to next question
    if (this.mode === 'test') {
      this.checkAnswer();
      
      // For test mode, automatically move to next question
      setTimeout(() => {
        this.nextQuestion();
      }, 300);
    }
  }
  
  // Check if the current answer is correct (used in practice mode)
  checkAnswer() {
    const currentQuestion = this.questionData.questions[this.currentQuestionIndex];
    const questionId = currentQuestion.id;
    const userAnswer = this.userAnswers[questionId];
    
    if (!userAnswer) return; // No answer selected
    
    this.showAnswers = true;
    
    // Validate the answer (decode the validation hash)
    const correctAnswer = atob(currentQuestion.validationHash);
    this.isCorrect = userAnswer === correctAnswer;
    
    // Store the result
    this.questionResults[questionId] = this.isCorrect;
    
    // Update total correct count
    if (this.isCorrect && !Object.prototype.hasOwnProperty.call(this.questionResults, questionId)) {
      this.totalCorrect++;
    } 
  }

  // Move to the next question or complete the challenge
  nextQuestion() {
    this.showAnswers = false;

    if (this.currentQuestionIndex < this.questionData.questions.length - 1) {
      // Move to next question
      this.currentQuestionIndex++;
    } else {
      // All questions answered, show completion
      this.completeChallenge();
    }
  }

  // Complete the challenge and calculate final score
  completeChallenge() {
    // Stop timer if running
    this.stopTimer();

    // Calculate final score based on correct answers
    const correctAnswers = Object.values(this.questionResults).filter(val => val === true).length;
    this.totalCorrect = correctAnswers;
    this.score = Math.round((this.totalCorrect / this.questionData.questions.length) * 100);

    // Update state to show completion screen
    this.currentState = 'complete';

    // Update the step with the score
    if (this.currentStep) {
      if (this.mode === 'practice') {
        this.currentStep.practiceScore = this.score;
      } else if (this.mode === 'test') {
        this.currentStep.testScore = this.score;
      }
    }
  }

  // Called from ResultComponent - Retry challenge
  onRetryChallenge() {
    // Reset everything and start over with the same mode
    if (this.currentStep) {
      if (this.mode === 'practice') {
        this.currentStep.practiceAttempts = (this.currentStep.practiceAttempts || 0) + 1;
      } else if (this.mode === 'test') {
        this.currentStep.testAttempts = (this.currentStep.testAttempts || 0) + 1;
      }
    }

    // Reset state
    this.currentState = 'intro';
  }

  // Called from ResultComponent - Finish challenge
  onFinishChallenge() {
    // Get the passing threshold from the current step or use 70% as default
    const passingThreshold = this.currentStep?.passingThreshold || 70;
    
    // Pass in practice mode or if score is sufficient in test mode
    const passed = this.mode === 'practice' || this.score >= passingThreshold;
    
    const responseData = {
      context: 'challenge-complete',
      data: {
        completed: true,
        passed: passed,
        score: this.score,
        correctAnswers: this.totalCorrect,
        totalQuestions: this.questionData.questions.length,
        mode: this.mode,
        passingThreshold: passingThreshold
      }
    };

    this.subChallengeResponse.emit(responseData);
  }
  
  // Called from ResultComponent or IntroComponent - Exit challenge
  onExitChallenge() {
    // In practice mode, we don't want to mark the challenge as completed
    // Just emit an event to return to the map/journey view
    const responseData = {
      context: 'challenge-exit',
      data: {
        completed: false, // Not marking as completed
        mode: this.mode
      }
    };

    this.subChallengeResponse.emit(responseData);
  }

  // Timer functions
  startTimer() {
    this.currentTimeInSeconds = this.totalTimeInSeconds;
    this.updateTimerDisplay();

    this.timerSubscription = interval(1000).subscribe(() => {
      this.currentTimeInSeconds--;
      this.updateTimerDisplay();

      if (this.currentTimeInSeconds <= 0) {
        this.stopTimer();
        this.completeChallenge();
      }
    });
  }

  stopTimer() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
      this.timerSubscription = null;
    }
  }

  updateTimerDisplay() {
    const minutes = Math.floor(this.currentTimeInSeconds / 60);
    const seconds = this.currentTimeInSeconds % 60;
    this.remainingTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  
  // Helper method to get the correct answer text
  getCorrectAnswerText(question: any): string {
    if (!question) return '';
    
    // Get the correct answer ID from the validation hash
    const correctAnswerId = atob(question.validationHash);
    
    // Find the option with that ID
    const correctOption = question.options.find((option: any) => option.id === correctAnswerId);
    
    // Return the text if found, otherwise return empty string
    return correctOption ? correctOption.text : '';
  }
  
  // Helper for determining if this is the last question
  get isLastQuestion(): boolean {
    return this.currentQuestionIndex === this.questionData?.questions?.length - 1;
  }
}