import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { BlockJourneySteps } from "./learning-journey-interface";


@Injectable({
    providedIn: 'root'
})
export class LearningJourneyService {
    private currentJourneySubject = new BehaviorSubject<any>(null);
    public currentJourney$ = this.currentJourneySubject.asObservable();

    constructor() { }

    updateJourney(updatedJourney: any): void {
        this.currentJourneySubject.next(updatedJourney);
    }

    updateStep(stepId: string, updatedStepData: any): void {
        const currentJourney = this.currentJourneySubject.getValue();

        if (!currentJourney) return;

        const updatedSteps = currentJourney.steps.map((step: any) =>
            step.stepId === stepId ? { ...step, ...updatedStepData } : step
        );

        this.updateJourney({
            ...currentJourney,
            steps: updatedSteps
        });
    }

    
}