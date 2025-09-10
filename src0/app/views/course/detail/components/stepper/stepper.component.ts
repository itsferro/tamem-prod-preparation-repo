import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'detail-stepper',
  standalone: true,
  imports: [],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.scss'
})
export class StepperComponent implements OnChanges {
  @Input() totalSteps: number = 1;
  @Input() currentStep: number = 1;

  steps: number[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['totalSteps']) {
      this.steps = Array(this.totalSteps).fill(0).map((_, i) => i + 1);
    }
  }

  calculateStepPosition(): number {
    // Calculate the percentage position of the current step
    return ((this.currentStep - 1) / (this.totalSteps - 1)) * 100;
  }

  calculateProgressWidth(): number {
    // Calculate the width of the progress bar
    return ((this.currentStep - 1) / (this.totalSteps - 1)) * 100;
  }
}