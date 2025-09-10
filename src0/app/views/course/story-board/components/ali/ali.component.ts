// ali.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  trigger, 
  state, 
  style, 
  animate, 
  transition,
  AnimationEvent
} from '@angular/animations';

@Component({
  selector: 'story-board-ali',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ali.component.html',
  styleUrls: ['./ali.component.scss'],
  animations: [
    trigger('digitAnimation', [
      state('hidden', style({
        opacity: 0,
        transform: 'translateY(20px)'
      })),
      state('visible', style({
        opacity: 1,
        transform: 'translateY(0)'
      })),
      transition('hidden => visible', [
        animate('0.8s ease-out')
      ]),
      transition('visible => hidden', [
        animate('0.5s ease-in')
      ])
    ]),
    trigger('cellHighlight', [
      state('inactive', style({
        boxShadow: '0 0 0 0px rgba(255, 255, 0, 0)'
      })),
      state('active', style({
        boxShadow: '0 0 0 4px rgba(255, 255, 0, 0.8)'
      })),
      transition('inactive => active', [
        animate('0.3s ease-out')
      ]),
      transition('active => inactive', [
        animate('0.5s ease-in')
      ])
    ]),
    trigger('numberGrow', [
      state('small', style({
        fontSize: '24px',
        opacity: 0.7
      })),
      state('large', style({
        fontSize: '40px',
        opacity: 1
      })),
      transition('small <=> large', [
        animate('1.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)')
      ])
    ]),
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0,
        transform: 'translateY(10px)'
      })),
      state('*', style({
        opacity: 1,
        transform: 'translateY(0)'
      })),
      transition('void <=> *', animate('0.8s ease-in-out'))
    ])
  ]
})
export class AliComponent implements OnInit, OnDestroy {
  // Reversed order to match RTL direction (آحاد on right, مليون on left)
  placeValueNames = ['آحاد', 'عشرات', 'مئات', 'آلاف', 'عشرات الآلاف', 'مئات الآلاف', 'مليون'];
  placeValueClasses = ['ones', 'tens', 'hundreds', 'thousands', 'ten-thousands', 'hundred-thousands', 'millions'];
  
  digits: { value: string, state: string, highlight: string }[] = [];
  displayNumber = '';
  arabicDisplayNumber = '';
  numberInWords = '';
  numberAnimation = 'small';
  currentExampleIndex = -1;
  isAnimating = false;
  
  examples = [
    { number: 10000, arabic: 'عشرة آلاف' },
    { number: 100000, arabic: 'مائة ألف' },
    { number: 503962, arabic: 'خمسمائة وثلاثة آلاف وتسعمائة واثنان وستون' },
    { number: 861257, arabic: 'ثمانمائة وواحد وستون ألفًا ومائتان وسبعة وخمسون' },
    { number: 1000000, arabic: 'مليون' }
  ];
  
  isAutoPlaying = false;
  autoPlayInterval: any;

  constructor() { }

  ngOnInit(): void {
    this.initializeDigits();
  }

  ngOnDestroy(): void {
    this.stopAutoPlay();
  }

  initializeDigits(): void {
    this.digits = Array(7).fill(0).map(() => ({
      value: '0',
      state: 'visible',
      highlight: 'inactive'
    }));
  }

  showExample(index: number): void {
    if (this.isAnimating) return;
    this.isAnimating = true;
    
    // Don't reset explanations when showing a new example
    // Only reset the digits and animation states
    this.numberAnimation = 'small';
    this.digits.forEach(digit => {
      digit.state = 'hidden';
      digit.highlight = 'inactive';
    });
    
    this.currentExampleIndex = index;
    const example = this.examples[index];
    
    // Use English numerals for the actual number display
    this.displayNumber = example.number.toString();
    this.numberInWords = example.arabic;
    this.numberAnimation = 'large';

    setTimeout(() => {
      // Convert to string and pad with leading zeros
      const numStr = example.number.toString().padStart(7, '0');
      
      // Reverse the string for RTL display (1000 becomes 0001)
      const reverseNumStr = numStr.split('').reverse().join('');
      
      // Update each digit with animation delay (slowed down)
      reverseNumStr.split('').forEach((digit, idx) => {
        setTimeout(() => {
          this.digits[idx].state = 'hidden';
          
          setTimeout(() => {
            this.digits[idx].value = digit;
            this.digits[idx].state = 'visible';
            this.digits[idx].highlight = 'active';
            
            // Reset highlight after delay (increased)
            setTimeout(() => {
              this.digits[idx].highlight = 'inactive';
              
              // Mark animation as complete after the last digit's animation finishes
              if (idx === 6) {
                setTimeout(() => this.isAnimating = false, 500);
              }
            }, 1200);
          }, 500);
        }, idx * 700);
      });
    }, 500);
  }

  resetStates(): void {
    this.numberAnimation = 'small';
    this.currentExampleIndex = -1;
    
    // Reset all digits
    this.digits.forEach(digit => {
      digit.state = 'hidden';
      digit.highlight = 'inactive';
    });
    
    setTimeout(() => {
      this.digits.forEach(digit => {
        digit.value = '0';
        digit.state = 'visible';
      });
      
      // Clear the display number to hide explanations
      this.displayNumber = '';
      this.numberInWords = '';
    }, 500);
  }

  startAutoPlay(): void {
    if (this.isAutoPlaying || this.isAnimating) return;
    
    this.isAutoPlaying = true;
    this.currentExampleIndex = 0;
    this.showExample(this.currentExampleIndex);
    
    this.autoPlayInterval = setInterval(() => {
      if (this.isAnimating) return;
      
      this.currentExampleIndex = (this.currentExampleIndex + 1) % this.examples.length;
      this.showExample(this.currentExampleIndex);
    }, 8000); // Longer interval between examples in auto-play mode
  }

  stopAutoPlay(): void {
    if (!this.isAutoPlaying) return;
    
    clearInterval(this.autoPlayInterval);
    this.isAutoPlaying = false;
  }

  manualExample(index: number): void {
    if (this.isAnimating) return;
    this.stopAutoPlay();
    this.showExample(index);
  }
  
  isActive(index: number): boolean {
    return this.currentExampleIndex === index;
  }
  
  // Method to handle animation completion if needed
  onAnimationDone(event: AnimationEvent): void {
    // Handle animations completion events if necessary
  }
}