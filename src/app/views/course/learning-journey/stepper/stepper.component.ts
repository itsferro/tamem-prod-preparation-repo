// stepper/stepper.component.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'journey-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  standalone: true
})
export class StepperComponent {
  @Input() currentStep: number = 0;
  @Input() totalSteps: number = 0;
  
  // Create an array to iterate over in the template
  get steps(): number[] {
    return Array(this.totalSteps).fill(0).map((_, i) => i);
  }
}