import { Component, EventEmitter, Input, Output, inject, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription, interval } from 'rxjs';
import { TamemService } from '@/app/core/service/tamem-service.service';
import { IntroComponent } from '../intro/intro.component';
import { ResultComponent } from '../result/result.component';

@Component({
  selector: 'journey-challenge-mcq',
  standalone: true,
  imports: [
    CommonModule,
    IntroComponent,
    ResultComponent
  ],
  templateUrl: './challenge-mcq.component.html',
  styleUrls: ['./challenge-mcq.component.scss']
})
export class ChallengeMcqComponent implements OnInit, OnDestroy {
  @Input() currentStep!: any;
  @Input() challengeData!: any;
  @Input() mode: 'practice' | 'test' | 'view' = 'practice';


  @Input() blockData: any;

  @Output() subChallengeResponse = new EventEmitter<any>();

  atob = atob;

  private tamemService = inject(TamemService);
  private renderer = inject(Renderer2);
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

  // Score tracking
  totalCorrect: number = 0;
  score: number = 0;
  totalCorrectAnswers: number = 0;
  totalWrongAnswers: number = 0;
  totalTimeouts: number = 0;

  // Timer for test mode
  remainingTime: string = '30';
  totalTimeInSeconds: number = 30;
  currentTimeInSeconds: number = 30;

  // Feedback panel
  showFeedback: boolean = false;
  feedbackIsCorrect: boolean = false;
  feedbackType: 'correct' | 'incorrect' | 'timeout' = 'correct';

  // Exit confirmation
  showExitConfirmation: boolean = false;

  ngOnInit() {
    this.currentState = 'intro';

    if (!this.currentStep.currentMode) {
      // Will show mode selection in the intro
    } else {
      this.mode = this.currentStep.currentMode as 'practice' | 'test';
    }

    // Set timer value from JourneyStep if available
    if (this.currentStep && this.currentStep.timerSeconds) {
      this.totalTimeInSeconds = this.currentStep.timerSeconds;
      this.currentTimeInSeconds = this.currentStep.timerSeconds;
      this.remainingTime = this.currentTimeInSeconds.toString();
    }


    this.loadQuestionData();
  }

  ngOnDestroy() {
    this.stopTimer();
  }

  loadQuestionData() {
    this.isLoading = true;

    console.log('current blockId is:', this.blockData.id) ; 
 
    if(this.blockData.id){
      this.tamemService.getMcqChallengeData(this.blockData.id).subscribe({
        next: (data) => {
          this.questionData = data;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error loading MCQ data:', err);
          this.isLoading = false;
        }
      });
    }
    else{
      console.error('Block ID is not available');
      this.isLoading = false;
    }
   


  }

  startChallenge(event: { mode?: 'practice' | 'test' | 'view' }) {
    if (!event.mode || event.mode === 'view') {
      console.error('MCQ challenges require practice or test mode');
      return;
    }

    this.mode = event.mode;

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

    // Reset the running counters
    this.totalCorrectAnswers = 0;
    this.totalWrongAnswers = 0;
    this.totalTimeouts = 0;

    if (this.mode === 'test') {
      this.resetTimer();
      this.startTimer();
    }
  }

  answerQuestion(questionId: string, answerId: string) {
    if (this.showAnswers || this.showFeedback) return;

    this.userAnswers[questionId] = answerId;

    const currentQuestion = this.questionData.questions[this.currentQuestionIndex];
    const correctAnswer = this.decodeBase64(currentQuestion.validationHash);
    const isCorrect = answerId === correctAnswer;

    this.questionResults[questionId] = isCorrect;

    // Update score counts
    if (isCorrect) {
      this.totalCorrect++;
      this.totalCorrectAnswers++; // Increment total correct answers
    } else {
      this.totalWrongAnswers++; // Increment total wrong answers
    }

    if (this.mode === 'practice') {
      this.showAnswers = true;
    } else if (this.mode === 'test') {
      this.stopTimer();

      if (isCorrect) {
        // Show correct feedback with animation
        this.feedbackIsCorrect = true;
        this.showFeedback = true;
        this.feedbackType = 'correct';

        setTimeout(() => {
          this.hideFeedbackWithAnimation(() => {
            this.moveToNextQuestion();
          });
        }, 1000); // Reduced to 750ms for correct answers
      } else {
        // Show incorrect feedback with animation
        this.feedbackIsCorrect = false;
        this.showFeedback = true;
        this.feedbackType = 'incorrect';

        setTimeout(() => {
          this.hideFeedbackWithAnimation(() => {
            this.moveBackTwoQuestions();
          });
        }, 1100); // Reduced to 1000ms for incorrect answers
      }
    }
  }

  // Add animation when hiding the feedback panel
  hideFeedbackWithAnimation(callback: () => void) {
    const panel = document.querySelector('.feedback-panel');

    if (panel) {
      // Add slide-out animation class
      this.renderer.addClass(panel, 'slide-out-animation');

      // Wait for animation to complete
      setTimeout(() => {
        this.showFeedback = false;

        // Remove the animation class (for next time)
        setTimeout(() => {
          this.renderer.removeClass(panel, 'slide-out-animation');

          // Execute callback after animation
          if (callback) callback();
        }, 50);
      }, 300);
    } else {
      // If panel not found, just hide and call callback
      this.showFeedback = false;
      if (callback) callback();
    }
  }

  // Method to clear option selection
  clearOptionSelection() {
    setTimeout(() => {
      // Find all options
      const optionElements = document.querySelectorAll('.option');

      // Loop through each option and completely reset all visual styling
      optionElements.forEach(option => {
        const optionElement = option as HTMLElement;

        // Reset all styling that indicates selection
        optionElement.style.backgroundColor = 'white';
        optionElement.style.borderColor = '#e6e6e6';
        optionElement.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.05)';
        optionElement.style.transform = 'none';

        // Remove any selection classes
        optionElement.classList.remove('selected');

        // Add a class to reset pseudo-elements
        optionElement.classList.add('reset-styling');

        // Reset the marker element
        const marker = optionElement.querySelector('.option-marker') as HTMLElement;
        if (marker) {
          marker.style.backgroundColor = '#f0f0f0';
          marker.style.color = '#666';
          marker.style.borderColor = 'transparent';
          marker.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
          marker.style.transform = 'none';
        }

        // Reset the text element
        const text = optionElement.querySelector('.option-text') as HTMLElement;
        if (text) {
          text.style.color = '#5d6975';
          text.style.fontWeight = 'normal';
        }
      });

      // Clear the current selection in the data model
      if (this.questionData?.questions?.[this.currentQuestionIndex]) {
        const currentQuestionId = this.questionData.questions[this.currentQuestionIndex].id;
        delete this.userAnswers[currentQuestionId];
      }

      // Remove the temporary reset class after styles have been applied
      setTimeout(() => {
        optionElements.forEach(option => {
          option.classList.remove('reset-styling');
        });
      }, 100);
    }, 10);
  }

  moveToNextQuestion() {
    this.showAnswers = false;

    if (this.currentQuestionIndex < this.questionData.questions.length - 1) {
      this.currentQuestionIndex++;

      // Clear any selection
      this.clearOptionSelection();

      if (this.mode === 'test') {
        this.resetTimer();
        this.startTimer();
      }
    } else {
      this.completeChallenge();
    }
  }

  moveBackTwoQuestions() {
    const newIndex = Math.max(0, this.currentQuestionIndex - 2);

    // Clear answers for revisited questions
    for (let i = newIndex; i <= this.currentQuestionIndex; i++) {
      if (i < this.questionData.questions.length) {
        const questionId = this.questionData.questions[i].id;
        delete this.userAnswers[questionId];
        delete this.questionResults[questionId];
      }
    }

    this.currentQuestionIndex = newIndex;

    // Clear any selection
    this.clearOptionSelection();

    if (this.mode === 'test') {
      this.resetTimer();
      this.startTimer();
    }
  }

  handleTimerExpiration() {
    this.stopTimer();

    // Count timeout as a wrong answer
    this.totalTimeouts++;
    this.totalWrongAnswers++;

    // Show timeout feedback with unique timeout type
    this.feedbackIsCorrect = false;
    this.showFeedback = true;
    this.feedbackType = 'timeout';

    setTimeout(() => {
      this.hideFeedbackWithAnimation(() => {
        this.moveBackTwoQuestions();
      });
    }, 1000); // 1000ms for timeout
  }

  completeChallenge() {
    this.stopTimer();

    // Calculate score based on ratio of correct answers to total attempts
    const totalAttempts = this.totalCorrectAnswers + this.totalWrongAnswers;
    this.score = totalAttempts > 0 ? Math.round((this.totalCorrectAnswers / totalAttempts) * 100) : 0;

    this.currentState = 'complete';

    if (this.currentStep) {
      if (this.mode === 'practice') {
        this.currentStep.practiceScore = this.score;
      } else if (this.mode === 'test') {
        this.currentStep.testScore = this.score;
      }
    }
  }

  onRetryChallenge() {
    if (this.currentStep) {
      if (this.mode === 'practice') {
        this.currentStep.practiceAttempts = (this.currentStep.practiceAttempts || 0) + 1;
      } else if (this.mode === 'test') {
        this.currentStep.testAttempts = (this.currentStep.testAttempts || 0) + 1;
      }
    }

    this.currentState = 'intro';
  }

  onFinishChallenge() {
    const passingThreshold = this.currentStep?.passingThreshold || 70;
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
        passingThreshold: passingThreshold,
        totalCorrectAnswers: this.totalCorrectAnswers,
        totalWrongAnswers: this.totalWrongAnswers,
        totalTimeouts: this.totalTimeouts
      }
    };

    this.subChallengeResponse.emit(responseData);
  }

  startTimer() {
    this.timerSubscription = interval(1000).subscribe(() => {
      this.currentTimeInSeconds--;
      this.remainingTime = this.currentTimeInSeconds.toString();

      if (this.currentTimeInSeconds <= 0) {
        this.handleTimerExpiration();
      }
    });
  }

  stopTimer() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
      this.timerSubscription = null;
    }
  }

  resetTimer() {
    this.currentTimeInSeconds = this.totalTimeInSeconds;
    this.remainingTime = this.currentTimeInSeconds.toString();
  }

  onExitChallenge() {
    const responseData = {
      context: 'challenge-exit',
      data: {
        completed: false,
        mode: this.mode
      }
    };

    this.subChallengeResponse.emit(responseData);
  }

  // Exit confirmation methods
  confirmExit() {
    // Pause the timer if it's running
    if (this.mode === 'test') {
      this.stopTimer();
    }

    // Show confirmation dialog
    this.showExitConfirmation = true;
  }

  cancelExit() {
    // Hide confirmation dialog
    this.showExitConfirmation = false;

    // Resume the timer if in test mode
    if (this.mode === 'test') {
      this.startTimer();
    }
  }

  confirmExitChallenge() {
    // Hide confirmation dialog
    this.showExitConfirmation = false;

    // Reset to intro state
    this.currentState = 'intro';

    // Stop any timers
    this.stopTimer();
  }

  getCorrectAnswerText(question: any): string {
    if (!question) return '';

    const correctAnswerId = this.decodeBase64(question.validationHash);
    const correctOption = question.options.find((option: any) => option.id === correctAnswerId);

    return correctOption ? correctOption.text : '';
  }

  decodeBase64(str: string): string {
    try {
      return atob(str);
    } catch (e) {
      console.error('Error decoding base64 string:', e);
      return '';
    }
  }
}