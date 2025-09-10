import { Component, EventEmitter, OnInit, Output } from '@angular/core';


interface PlantPart {
  id: number;
  name: string;
  description: string;
  correctPosition: { x: number; y: number };
  isCorrectlyPlaced: boolean;
}



@Component({
  selector: 'detail-parts-identification',
  standalone: true,
  imports: [],
  templateUrl: './parts-identification.component.html',
  styleUrl: './parts-identification.component.scss'
})
export class PartsIdentificationComponent implements OnInit {
  @Output() challengeCompleted = new EventEmitter<number>();
  @Output() scoreEarned = new EventEmitter<number>();
  
  plantImage = 'assets/images/photosynthesis-plant.png';
  maxScore = 15;
  currentScore = 0;
  attemptsRemaining = 3;
  isCompleted = false;
  feedback = '';
  
  plantParts: PlantPart[] = [
    {
      id: 1,
      name: 'الورقة',
      description: 'تحتوي على الكلوروفيل وهي الموقع الرئيسي للتمثيل الضوئي',
      correctPosition: { x: 60, y: 40 },
      isCorrectlyPlaced: false
    },
    {
      id: 2,
      name: 'البلاستيدات الخضراء',
      description: 'تحتوي على الصبغات التي تمتص الطاقة الضوئية',
      correctPosition: { x: 75, y: 45 },
      isCorrectlyPlaced: false
    },
    {
      id: 3,
      name: 'الثغور',
      description: 'فتحات صغيرة تسمح بدخول ثاني أكسيد الكربون وخروج الأكسجين',
      correctPosition: { x: 65, y: 60 },
      isCorrectlyPlaced: false
    },
    {
      id: 4,
      name: 'الساق',
      description: 'ينقل الماء والمعادن من الجذور إلى الأوراق',
      correctPosition: { x: 50, y: 70 },
      isCorrectlyPlaced: false
    },
    {
      id: 5,
      name: 'الجذور',
      description: 'تمتص الماء والمعادن من التربة',
      correctPosition: { x: 50, y: 90 },
      isCorrectlyPlaced: false
    }
  ];
  
  selectedPart: PlantPart | null = null;
  
  constructor() { }
  
  ngOnInit(): void {
  }
  
  selectPart(part: PlantPart): void {
    this.selectedPart = part;
  }
  
  placePartOnImage(event: MouseEvent): void {
    if (!this.selectedPart || this.attemptsRemaining <= 0) return;
    
    const rect = (event.target as HTMLImageElement).getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    
    // Check if placement is close enough to correct position
    const correctX = this.selectedPart.correctPosition.x;
    const correctY = this.selectedPart.correctPosition.y;
    const distance = Math.sqrt(Math.pow(x - correctX, 2) + Math.pow(y - correctY, 2));
    
    if (distance < 10) { // Allow some margin of error (10%)
      this.selectedPart.isCorrectlyPlaced = true;
      this.feedback = `أحسنت! لقد حددت ${this.selectedPart.name} بشكل صحيح.`;
      this.updateScore();
    } else {
      this.attemptsRemaining--;
      this.feedback = `حاول مرة أخرى. لديك ${this.attemptsRemaining} محاولات متبقية.`;
      
      if (this.attemptsRemaining <= 0) {
        this.feedback = 'انتهت المحاولات. راجع المعلومات عن أجزاء النبات وحاول مرة أخرى.';
        this.checkCompletion();
      }
    }
    
    this.selectedPart = null;
  }
  
  updateScore(): void {
    const totalParts = this.plantParts.length;
    const correctParts = this.plantParts.filter(part => part.isCorrectlyPlaced).length;
    this.currentScore = Math.floor((correctParts / totalParts) * this.maxScore);
    
    this.checkCompletion();
  }
  
  checkCompletion(): void {
    const allCorrect = this.plantParts.every(part => part.isCorrectlyPlaced);
    const noAttemptsLeft = this.attemptsRemaining <= 0;
    
    if (allCorrect || noAttemptsLeft) {
      this.isCompleted = true;
      this.challengeCompleted.emit(4); // Challenge ID
      this.scoreEarned.emit(this.currentScore);
    }
  }
  
  resetChallenge(): void {
    this.plantParts.forEach(part => part.isCorrectlyPlaced = false);
    this.attemptsRemaining = 3;
    this.currentScore = 0;
    this.isCompleted = false;
    this.feedback = '';
    this.selectedPart = null;
  }
}