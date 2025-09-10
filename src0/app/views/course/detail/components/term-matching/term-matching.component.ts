import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


interface TermPair {
  id: number;
  term: string;
  definition: string;
}

interface DraggableItem {
  id: number;
  text: string;
  matched: boolean;
  pairedWithId?: number;
  showCorrect?: boolean;
  showIncorrect?: boolean;
}



@Component({
  selector: 'detail-term-matching',
  standalone: true,
  imports: [],
  templateUrl: './term-matching.component.html',
  styleUrl: './term-matching.component.scss'
})
export class TermMatchingComponent  implements OnInit {
  @Input() lessonId: number = 0;
  @Input() challengeId: number = 0;
  @Output() challengeCompleted = new EventEmitter<{
    score: number;
    totalPossible: number;
    passed: boolean;
  }>();

  termPairs: TermPair[] = [];
  shuffledTerms: DraggableItem[] = [];
  shuffledDefinitions: DraggableItem[] = [];
  
  selectedTermId: number | null = null;
  selectedDefinitionId: number | null = null;
  
  completedPairs: number = 0;
  hintsUsed: number = 0;
  showHintButton: boolean = true;
  
  isCompleted: boolean = false;
  score: number = 0;
  maxScore: number = 15; // Total possible points for this challenge

  constructor() {}

  ngOnInit(): void {
    this.loadTermPairs();
    this.shuffleItems();
  }

  loadTermPairs(): void {
    // In a real app, fetch from API based on lessonId and challengeId
    this.termPairs = [
      {
        id: 1,
        term: 'التمثيل الضوئي',
        definition: 'عملية تحويل الطاقة الضوئية إلى طاقة كيميائية في النباتات باستخدام الضوء والماء وثاني أكسيد الكربون'
      },
      {
        id: 2,
        term: 'الكلوروفيل',
        definition: 'الصبغة الخضراء في النباتات المسؤولة عن امتصاص الطاقة الضوئية اللازمة لعملية التمثيل الضوئي'
      },
      {
        id: 3,
        term: 'البلاستيدات الخضراء',
        definition: 'عضيات في الخلايا النباتية تحتوي على الكلوروفيل وتحدث فيها عملية التمثيل الضوئي'
      },
      {
        id: 4,
        term: 'الثغور',
        definition: 'فتحات صغيرة في أوراق النباتات تسمح بتبادل الغازات ودخول ثاني أكسيد الكربون'
      },
      {
        id: 5,
        term: 'الجلوكوز',
        definition: 'السكر الناتج عن عملية التمثيل الضوئي والذي يستخدمه النبات كمصدر للطاقة'
      }
    ];
  }

  shuffleItems(): void {
    // Create terms array
    this.shuffledTerms = this.termPairs.map(pair => ({
      id: pair.id,
      text: pair.term,
      matched: false
    }));
    
    // Create definitions array
    this.shuffledDefinitions = this.termPairs.map(pair => ({
      id: pair.id,
      text: pair.definition,
      matched: false
    }));
    
    // Shuffle the definitions array only to make the game challenging
    this.shuffleArray(this.shuffledDefinitions);
  }
  
  // Fisher-Yates (Knuth) shuffle algorithm
  shuffleArray(array: any[]): void {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  // Drag and drop handlers
  onDragStart(event: DragEvent, id: number, type: 'term' | 'definition'): void {
    if (event.dataTransfer) {
      event.dataTransfer.setData('text/plain', `${type}:${id}`);
      event.dataTransfer.effectAllowed = 'move';
    }
  }
  
  onDragOver(event: DragEvent): void {
    // Prevent default to allow drop
    event.preventDefault();
  }
  
  onDrop(event: DragEvent, definitionId: number): void {
    event.preventDefault();
    
    if (event.dataTransfer) {
      const data = event.dataTransfer.getData('text/plain');
      const [type, idStr] = data.split(':');
      const draggedId = parseInt(idStr, 10);
      
      if (type === 'term') {
        this.checkPair(draggedId, definitionId);
      }
    }
  }
  
  // Click handlers for mobile and non-drag support
  onTermClick(termId: number): void {
    // Deselect if already selected
    if (this.selectedTermId === termId) {
      this.selectedTermId = null;
      return;
    }
    
    this.selectedTermId = termId;
    
    // If a definition is also selected, check the pair
    if (this.selectedDefinitionId !== null) {
      this.checkMatch();
    }
  }
  
  onDefinitionClick(definitionId: number): void {
    // Deselect if already selected
    if (this.selectedDefinitionId === definitionId) {
      this.selectedDefinitionId = null;
      return;
    }
    
    this.selectedDefinitionId = definitionId;
    
    // If a term is also selected, check the pair
    if (this.selectedTermId !== null) {
      this.checkMatch();
    }
  }
  
  // Check if the selected term and definition match
  checkMatch(): void {
    if (this.selectedTermId === null || this.selectedDefinitionId === null) {
      return;
    }
    
    this.checkPair(this.selectedTermId, this.selectedDefinitionId);
    
    // Reset selections
    this.selectedTermId = null;
    this.selectedDefinitionId = null;
  }
  
  checkPair(termId: number, definitionId: number): void {
    // Find the selected items
    const term = this.shuffledTerms.find(t => t.id === termId);
    const definition = this.shuffledDefinitions.find(d => d.id === definitionId);
    
    if (!term || !definition || term.matched || definition.matched) {
      return;
    }
    
    // Check if they match
    const isMatch = termId === definitionId;
    
    if (isMatch) {
      // If match, mark both as matched
      term.matched = true;
      definition.matched = true;
      term.pairedWithId = definitionId;
      definition.pairedWithId = termId;
      definition.showCorrect = true;
      
      // Remove correct indicator after animation
      setTimeout(() => {
        if (definition) {
          definition.showCorrect = false;
        }
      }, 1500);
      
      this.completedPairs++;
      
      // Update score - give full points if no hints used
      const pairScore = this.hintsUsed > 0 ? 2 : 3; // Max 3 points per pair
      this.score += pairScore;
      
      // Check if all pairs are matched
      if (this.completedPairs === this.termPairs.length) {
        setTimeout(() => {
          this.isCompleted = true;
        }, 1000);
      }
    } else {
      // If not a match, show incorrect indicator
      definition.showIncorrect = true;
      
      // Remove incorrect indicator after animation
      setTimeout(() => {
        if (definition) {
          definition.showIncorrect = false;
        }
      }, 1000);
    }
  }
  
  showHint(): void {
    if (this.hintsUsed >= 3 || this.completedPairs === this.termPairs.length) {
      return;
    }
    
    // Find an unmatched term
    const unmatchedTerms = this.shuffledTerms.filter(t => !t.matched);
    
    if (unmatchedTerms.length === 0) {
      return;
    }
    
    // Select a random unmatched term
    const randomTerm = unmatchedTerms[Math.floor(Math.random() * unmatchedTerms.length)];
    
    // Highlight the term and its corresponding definition
    this.selectedTermId = randomTerm.id;
    
    // Find the matching definition in the shuffled list
    const matchingDefinition = this.shuffledDefinitions.find(d => d.id === randomTerm.id);
    
    if (matchingDefinition && !matchingDefinition.matched) {
      this.selectedDefinitionId = matchingDefinition.id;
    }
    
    this.hintsUsed++;
    
    // Disable hint button if max hints used
    if (this.hintsUsed >= 3) {
      this.showHintButton = false;
    }
  }
  
  retryChallenge(): void {
    // Reset the game
    this.completedPairs = 0;
    this.hintsUsed = 0;
    this.score = 0;
    this.showHintButton = true;
    this.isCompleted = false;
    this.selectedTermId = null;
    this.selectedDefinitionId = null;
    
    // Reset all items and reshuffle
    this.shuffleItems();
  }
  
  completeChallenge(): void {
    const totalPossible = this.maxScore;
    const passed = this.score >= (totalPossible * 0.7); // 70% to pass
    
    this.challengeCompleted.emit({
      score: this.score,
      totalPossible,
      passed
    });
  }
  
  getScoreMessage(): string {
    const percentage = (this.score / this.maxScore) * 100;
    
    if (percentage >= 90) {
      return 'ممتاز! لديك فهم ممتاز للمصطلحات العلمية.';
    } else if (percentage >= 70) {
      return 'جيد جدًا! تعرفت على معظم المصطلحات بشكل صحيح.';
    } else if (percentage >= 50) {
      return 'جيد! يمكنك مراجعة المصطلحات للتحسين.';
    } else {
      return 'تحتاج إلى مزيد من المراجعة للمصطلحات العلمية.';
    }
  }
}