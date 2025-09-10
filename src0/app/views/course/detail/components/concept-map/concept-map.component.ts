
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';

interface ConceptNode {
  id: string;
  text: string;
  correctPosition?: string;
  isPlaced: boolean;
}

interface Placeholder {
  id: string;
  assignedConceptId?: string;
  isCorrect: boolean;
  hint: string;
}



@Component({
  selector: 'detail-concept-map',
  standalone: true,
  imports: [
     CommonModule,
    DragDropModule
  ],
  templateUrl: './concept-map.component.html',
  styleUrl: './concept-map.component.scss'
})
export class ConceptMapComponent implements OnInit {
  @Output() challengeCompleted = new EventEmitter<number>();
  @Output() scoreEarned = new EventEmitter<number>();
  
  maxScore = 15;
  currentScore = 0;
  remainingHints = 3;
  isCompleted = false;
  showFeedback = false;
  
  availableConcepts: ConceptNode[] = [
    { id: 'concept1', text: 'الكلوروفيل', correctPosition: 'placeholder2', isPlaced: false },
    { id: 'concept2', text: 'ثاني أكسيد الكربون', correctPosition: 'placeholder4', isPlaced: false },
    { id: 'concept3', text: 'الأكسجين', correctPosition: 'placeholder6', isPlaced: false },
    { id: 'concept4', text: 'ATP', correctPosition: 'placeholder7', isPlaced: false },
    { id: 'concept5', text: 'NADPH', correctPosition: 'placeholder8', isPlaced: false },
    { id: 'concept6', text: 'سكر الجلوكوز', correctPosition: 'placeholder9', isPlaced: false },
    { id: 'concept7', text: 'الضوء', correctPosition: 'placeholder1', isPlaced: false },
    { id: 'concept8', text: 'الماء', correctPosition: 'placeholder3', isPlaced: false },
    { id: 'concept9', text: 'البلاستيدات الخضراء', correctPosition: 'placeholder5', isPlaced: false }
  ];
  
  placedConcepts: ConceptNode[] = [];
  
  placeholders: Placeholder[] = [
    { id: 'placeholder1', isCorrect: false, hint: 'مصدر الطاقة الرئيسي لعملية التمثيل الضوئي' },
    { id: 'placeholder2', isCorrect: false, hint: 'الصبغة التي تمتص الطاقة الضوئية' },
    { id: 'placeholder3', isCorrect: false, hint: 'مادة تتحلل خلال التفاعلات الضوئية' },
    { id: 'placeholder4', isCorrect: false, hint: 'غاز ضروري يدخل عبر الثغور' },
    { id: 'placeholder5', isCorrect: false, hint: 'العضية التي تحدث فيها عملية التمثيل الضوئي' },
    { id: 'placeholder6', isCorrect: false, hint: 'غاز ينتج كمنتج ثانوي للتفاعلات الضوئية' },
    { id: 'placeholder7', isCorrect: false, hint: 'جزيء يخزن الطاقة الناتجة من التفاعلات الضوئية' },
    { id: 'placeholder8', isCorrect: false, hint: 'ناقل للإلكترونات ينتج في التفاعلات الضوئية' },
    { id: 'placeholder9', isCorrect: false, hint: 'المنتج النهائي لدورة كالفن' }
  ];
  
  activeHint: string | null = null;
  
  constructor() { 
    // Shuffle available concepts to randomize their order
    this.shuffleArray(this.availableConcepts);
  }
  
  ngOnInit(): void {
  }
  
  drop(event: CdkDragDrop<ConceptNode[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      
      // Update isPlaced property
      if (event.container.id === 'placedConcepts') {
        const movedConcept = this.placedConcepts[event.currentIndex];
        movedConcept.isPlaced = true;
      } else {
        const movedConcept = this.availableConcepts[event.currentIndex];
        movedConcept.isPlaced = false;
      }
    }
  }
  
  assignConceptToPlaceholder(event: CdkDragDrop<any>, placeholder: Placeholder) {
    if (event.previousContainer.id === 'placedConcepts' && !placeholder.assignedConceptId) {
      const concept = this.placedConcepts[event.previousIndex];
      placeholder.assignedConceptId = concept.id;
      placeholder.isCorrect = concept.correctPosition === placeholder.id;
      
      this.placedConcepts.splice(event.previousIndex, 1);
      
      this.updateScore();
      this.checkCompletion();
    }
  }
  
  removeFromPlaceholder(placeholder: Placeholder) {
    if (placeholder.assignedConceptId) {
      const concept = this.availableConcepts.find(c => c.id === placeholder.assignedConceptId) || 
                      this.placedConcepts.find(c => c.id === placeholder.assignedConceptId);
      
      if (concept) {
        concept.isPlaced = false;
        this.placedConcepts.push({...concept});
      }
      
      placeholder.assignedConceptId = undefined;
      placeholder.isCorrect = false;
      
      this.updateScore();
    }
  }
  
  showHint(placeholder: Placeholder) {
    if (this.remainingHints > 0) {
      this.activeHint = placeholder.hint;
      this.remainingHints--;
    }
  }
  
  closeHint() {
    this.activeHint = null;
  }
  
  getConceptForPlaceholder(placeholder: Placeholder): ConceptNode | undefined {
    if (!placeholder.assignedConceptId) return undefined;
    
    return this.availableConcepts.find(c => c.id === placeholder.assignedConceptId) || 
           this.placedConcepts.find(c => c.id === placeholder.assignedConceptId);
  }
  
  updateScore() {
    const correctPlacements = this.placeholders.filter(p => p.isCorrect).length;
    this.currentScore = Math.floor((correctPlacements / this.placeholders.length) * this.maxScore);
  }
  checkCompletion() {
    const allPlaced = this.placeholders.every(p => p.assignedConceptId !== undefined);
  
    if (allPlaced) {
      this.showFeedback = true;
  
      // Create a new array with updated isCorrect values
      const updatedPlaceholders = this.placeholders.map(p => ({
        ...p,
        isCorrect: this.getConceptForPlaceholder(p)?.correctPosition === p.id
      }));
  
      this.placeholders = updatedPlaceholders; // Assign the new array
  
      const allCorrect = this.placeholders.every(p => p.isCorrect);
      if (allCorrect) {
        this.isCompleted = true;
      }
    }
  }

  
  
  finishChallenge() {
    this.isCompleted = true;
    this.challengeCompleted.emit(6); // Challenge ID
    this.scoreEarned.emit(this.currentScore);
  }
  
  restartChallenge() {
    this.placeholders.forEach(p => {
      p.assignedConceptId = undefined;
      p.isCorrect = false;
    });
    
    this.availableConcepts = [
      { id: 'concept1', text: 'الكلوروفيل', correctPosition: 'placeholder2', isPlaced: false },
      { id: 'concept2', text: 'ثاني أكسيد الكربون', correctPosition: 'placeholder4', isPlaced: false },
      { id: 'concept3', text: 'الأكسجين', correctPosition: 'placeholder6', isPlaced: false },
      { id: 'concept4', text: 'ATP', correctPosition: 'placeholder7', isPlaced: false },
      { id: 'concept5', text: 'NADPH', correctPosition: 'placeholder8', isPlaced: false },
      { id: 'concept6', text: 'سكر الجلوكوز', correctPosition: 'placeholder9', isPlaced: false },
      { id: 'concept7', text: 'الضوء', correctPosition: 'placeholder1', isPlaced: false },
      { id: 'concept8', text: 'الماء', correctPosition: 'placeholder3', isPlaced: false },
      { id: 'concept9', text: 'البلاستيدات الخضراء', correctPosition: 'placeholder5', isPlaced: false }
    ];
    
    this.shuffleArray(this.availableConcepts);
    this.placedConcepts = [];
    this.remainingHints = 3;
    this.currentScore = 0;
    this.showFeedback = false;
    this.isCompleted = false;
    this.activeHint = null;
  }
  
  // Fisher-Yates shuffle algorithm
  private shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }




  areAllConceptsCorrect(): boolean {
    return this.placeholders.every(p => p.isCorrect);
  }
  
  getPlacedConceptsCount(): number {
    return this.placeholders.filter(p => p.assignedConceptId !== undefined).length;
  }
  
  getCorrectConceptsCount(): number {
    return this.placeholders.filter(p => p.isCorrect).length;
  }
  
  

  // Add these methods to your component class
isAvailableListEmpty(): boolean {
  return this.availableConcepts.length === 0;
}

isPlacedListEmpty(): boolean {
  return this.placedConcepts.length === 0;
}

hasAssignedConcept(placeholder: Placeholder): boolean {
  return placeholder.assignedConceptId !== undefined;
}

isPlaceholderIncorrect(placeholder: Placeholder): boolean {
  return placeholder.assignedConceptId !== undefined && !placeholder.isCorrect;
}

getConceptText(placeholder: Placeholder): string {
  const concept = this.getConceptForPlaceholder(placeholder);
  return concept ? concept.text : '';
}


hasAnyPlacedConcepts(): boolean {
  return this.placeholders.some(p => p.assignedConceptId !== undefined);
}





}
