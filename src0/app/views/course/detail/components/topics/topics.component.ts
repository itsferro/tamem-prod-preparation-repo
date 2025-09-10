import { Component, OnInit } from '@angular/core';

// Define the interface with a different name to avoid conflicts
interface OptionItem {
  text: string;
  correct: boolean;
}

@Component({
  selector: 'detail-topics',
  standalone: true,
  imports: [],
  templateUrl: './topics.component.html',
  styleUrl: './topics.component.scss'
})
export class TopicsComponent  implements OnInit {
    

  topic = { title: 'مقدمة في عملية التمثيل الضوئي' };
  currentIndex = 0;
  totalItems = 8;
  isRevealed = false;
  isPaused = false;
  timerDuration = 5; // seconds
  selectedOption: string | null = null;
  isCorrect = false;
  
// Define options array with correct answer, using the OptionItem interface
options: OptionItem[] = [
  { text: 'البلاستيدات الخضراء', correct: true },
  { text: 'النواة', correct: false },
  { text: 'الميتوكوندريا', correct: false },
  { text: 'جدار الخلية', correct: false }
];
  
  constructor() {}

  ngOnInit(): void {
    // Start the timer and reveal the answer after timerDuration
    setTimeout(() => {
      this.isRevealed = true;
      // If no option was selected, reveal the correct answer
      if (!this.selectedOption) {
        this.selectedOption = this.options.find(opt => opt.correct)?.text || null;
      }
    }, this.timerDuration * 1000);
  }

  selectOption(option: string, correct: boolean): void {
    this.selectedOption = option;
    this.isCorrect = correct;
    
    // Optional: If they got it right, you might want to skip the wait
    if (correct) {
      // Reduce timer if correct
      setTimeout(() => {
        this.isRevealed = true;
      }, 2000); // Show correct answer after 2 seconds of feedback
    } else {
      // Keep original timer for incorrect answers
      // Let them see the correct answer when timer completes
    }
  }

  showHint(): void {
    // Implement hint functionality
    console.log('Showing hint');
  }

  listenForAnswer(): void {
    // Implement speech recognition if available
    console.log('Listening for answer');
  }

  goToPrevious(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.resetState();
    }
  }

  goToNext(): void {
    if (this.currentIndex < this.totalItems - 1) {
      this.currentIndex++;
      this.resetState();
    }
  }

  resetState(): void {
    this.isRevealed = false;
    this.selectedOption = null;
    this.isCorrect = false;
    
    // Reset timer logic here
    setTimeout(() => {
      this.isRevealed = true;
      // If no option was selected, reveal the correct answer
      if (!this.selectedOption) {
        this.selectedOption = this.options.find(opt => opt.correct)?.text || null;
      }
    }, this.timerDuration * 1000);
  }

}
