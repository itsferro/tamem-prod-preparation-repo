import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';



interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}


@Component({
  selector: 'detail-knowledge-check',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './knowledge-check.component.html',
  styleUrl: './knowledge-check.component.scss'
})
export class KnowledgeCheckComponent   implements OnInit {
 
  @Input() lessonId: number = 0;
  @Input() challengeId: number = 0;
  @Output() challengeCompleted = new EventEmitter<{
    score: number;
    totalPossible: number;
    passed: boolean;
  }>();

  questions: Question[] = [];
  currentQuestionIndex = 0;
  answerForm!: FormGroup; // Using the non-null assertion operator
  showExplanation = false;
  isCorrect = false;
  isSubmitted = false;
  totalCorrect = 0;
  isCompleted = false;
  
  get currentQuestion(): Question {
    return this.questions[this.currentQuestionIndex];
  }
  
  get isLastQuestion(): boolean {
    return this.currentQuestionIndex === this.questions.length - 1;
  }

  constructor(private fb: FormBuilder) {
    // Initialize the form in the constructor
    this.answerForm = this.fb.group({
      selectedOption: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadQuestions();
    // Reinitialize the form to ensure it's defined
    this.answerForm = this.fb.group({
      selectedOption: ['', Validators.required]
    });
  }

  loadQuestions(): void {
    // In a real app, fetch from API based on lessonId and challengeId
    this.questions = [
      {
        id: 1,
        text: 'ما هو المصدر الرئيسي للطاقة في عملية التمثيل الضوئي؟',
        options: ['الماء', 'ثاني أكسيد الكربون', 'الضوء', 'الكلوروفيل'],
        correctAnswer: 2,
        explanation:
          'الضوء هو المصدر الرئيسي للطاقة في عملية التمثيل الضوئي، حيث تقوم النباتات بتحويل الطاقة الضوئية إلى طاقة كيميائية.'
      },
      {
        id: 2,
        text: 'أين تحدث عملية التمثيل الضوئي في الخلية النباتية؟',
        options: [
          'النواة',
          'البلاستيدات الخضراء',
          'الميتوكوندريا',
          'الفجوة العصارية'
        ],
        correctAnswer: 1,
        explanation:
          'تحدث عملية التمثيل الضوئي في البلاستيدات الخضراء (الكلوروبلاست) التي تحتوي على الكلوروفيل اللازم لامتصاص الضوء.'
      },
      {
        id: 3,
        text: 'ما هي المواد الناتجة عن عملية التمثيل الضوئي؟',
        options: [
          'ثاني أكسيد الكربون والماء',
          'الأكسجين والجلوكوز',
          'الكلوروفيل والماء',
          'ثاني أكسيد الكربون والأكسجين'
        ],
        correctAnswer: 1,
        explanation:
          'ينتج عن عملية التمثيل الضوئي الأكسجين والجلوكوز (سكر). يُطلق الأكسجين في الهواء بينما يستخدم النبات الجلوكوز كمصدر للطاقة أو يخزنه على شكل نشا.'
      },
      {
        id: 4,
        text: 'ما هي المواد اللازمة لعملية التمثيل الضوئي؟',
        options: [
          'الماء وثاني أكسيد الكربون والضوء',
          'الأكسجين والماء والضوء',
          'الجلوكوز والماء والضوء',
          'ثاني أكسيد الكربون والأكسجين والضوء'
        ],
        correctAnswer: 0,
        explanation:
          'تحتاج عملية التمثيل الضوئي إلى الماء وثاني أكسيد الكربون والضوء. يمتص النبات الماء من التربة وثاني أكسيد الكربون من الهواء، ويستخدم الضوء كمصدر للطاقة.'
      },
      {
        id: 5,
        text: 'ما هو دور الكلوروفيل في عملية التمثيل الضوئي؟',
        options: [
          'تحليل الماء',
          'إنتاج الأكسجين',
          'امتصاص الضوء',
          'تثبيت ثاني أكسيد الكربون'
        ],
        correctAnswer: 2,
        explanation:
          'الكلوروفيل هو الصبغة الخضراء التي تمتص الضوء وتحوله إلى طاقة كيميائية يمكن استخدامها في عملية التمثيل الضوئي. بدون الكلوروفيل، لا يمكن للنبات امتصاص الطاقة الضوئية اللازمة للعملية.'
      }
    ];
  }

  checkAnswer(): void {
    this.isSubmitted = true;
    this.showExplanation = true;
    
    const selectedOption = this.answerForm.controls['selectedOption'].value;
    this.isCorrect = selectedOption === this.currentQuestion.correctAnswer;
    
    if (this.isCorrect) {
      this.totalCorrect++;
    }
  }

  nextQuestion(): void {
    this.showExplanation = false;
    this.isSubmitted = false;
    
    if (this.isLastQuestion) {
      this.isCompleted = true;
    } else {
      this.currentQuestionIndex++;
      this.answerForm.reset();
    }
  }

  retryChallenge(): void {
    this.currentQuestionIndex = 0;
    this.totalCorrect = 0;
    this.isCompleted = false;
    this.isSubmitted = false;
    this.showExplanation = false;
    this.answerForm.reset();
  }

  completeChallenge(): void {
    const passingScore = 0.7; // 70% to pass
    const score = this.totalCorrect;
    const totalPossible = this.questions.length;
    const passed = (score / totalPossible) >= passingScore;
    
    this.challengeCompleted.emit({
      score,
      totalPossible,
      passed
    });
  }

  getScoreMessage(): string {
    const percentage = (this.totalCorrect / this.questions.length) * 100;
    
    if (percentage >= 90) {
      return 'ممتاز! لديك فهم ممتاز لهذا الموضوع.';
    } else if (percentage >= 70) {
      return 'جيد جدًا! لديك فهم جيد للمفاهيم الأساسية.';
    } else if (percentage >= 50) {
      return 'جيد! قد ترغب في مراجعة بعض المفاهيم لتحسين فهمك.';
    } else {
      return 'يبدو أنك بحاجة إلى مراجعة هذا الموضوع. حاول مرة أخرى بعد مراجعة المادة.';
    }
  }



}
