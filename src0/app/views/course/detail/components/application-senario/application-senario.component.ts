import { Component, EventEmitter, OnInit, Output } from '@angular/core';


interface Answer {
  id: number;
  text: string;
  correct: boolean;
  explanation: string;
  selected: boolean;
}

interface ScenarioStep {
  id: number;
  title: string;
  description: string;
  question: string;
  answers: Answer[];
  completed: boolean;
  image?: string;
}


@Component({
  selector: 'detail-application-senario',
  standalone: true,
  imports: [],
  templateUrl: './application-senario.component.html',
  styleUrl: './application-senario.component.scss'
})
export class ApplicationSenarioComponent implements OnInit {
  @Output() challengeCompleted = new EventEmitter<number>();
  @Output() scoreEarned = new EventEmitter<number>();
  
  maxScore = 20;
  currentScore = 0;
  currentStepIndex = 0;
  isCompleted = false;
  showFeedback = false;
  isCorrect = false;
  feedbackText = '';
  
  scenarioSteps: ScenarioStep[] = [
    {
      id: 1,
      title: 'مشكلة في البيت الزجاجي',
      description: 'أنت تعمل في بيت زجاجي حيث يتم زراعة الخضروات. لاحظت أن النباتات في الجزء الخلفي من البيت الزجاجي لا تنمو بنفس معدل النباتات في المقدمة، على الرغم من أنها تتلقى نفس كمية الماء والأسمدة.',
      question: 'ما هو السبب الأكثر احتمالاً لهذه المشكلة؟',
      image: 'assets/images/greenhouse.jpg',
      answers: [
        {
          id: 1,
          text: 'النباتات في الخلف تتعرض لمستويات أقل من ثاني أكسيد الكربون',
          correct: false,
          explanation: 'على الرغم من أن ثاني أكسيد الكربون ضروري، إلا أنه يتوزع بشكل متساوٍ في معظم البيوت الزجاجية المهواة جيداً.',
          selected: false
        },
        {
          id: 2,
          text: 'النباتات في الخلف تتلقى ضوءاً أقل مما يؤثر على معدل التمثيل الضوئي',
          correct: true,
          explanation: 'صحيح! شدة الضوء هي العامل المحدد هنا. النباتات في المقدمة تحجب الضوء عن النباتات الخلفية، مما يقلل من معدل التمثيل الضوئي وبالتالي يبطئ النمو.',
          selected: false
        },
        {
          id: 3,
          text: 'درجة الحرارة في الخلف أعلى مما يسبب تلف أنزيمات التمثيل الضوئي',
          correct: false,
          explanation: 'على الرغم من أن درجات الحرارة المرتفعة جداً يمكن أن تؤثر على الأنزيمات، إلا أن البيوت الزجاجية عادة ما تكون مصممة للحفاظ على درجة حرارة متجانسة نسبياً.',
          selected: false
        },
        {
          id: 4,
          text: 'التربة في الخلف تحتوي على مغذيات أقل',
          correct: false,
          explanation: 'المشكلة ذكرت أن جميع النباتات تتلقى نفس الأسمدة، لذا فإن نقص المغذيات ليس هو السبب المرجح.',
          selected: false
        }
      ],
      completed: false
    },
    {
      id: 2,
      title: 'تحسين إنتاجية المحاصيل',
      description: 'أنت مستشار زراعي تم تكليفك بزيادة إنتاجية محصول الطماطم في منطقة ذات شمس ساطعة وأمطار قليلة. تؤثر عوامل متعددة على عملية التمثيل الضوئي والتي بدورها تؤثر على إنتاجية المحصول.',
      question: 'أي من الإجراءات التالية سيكون له التأثير الأكبر على زيادة معدل التمثيل الضوئي في هذه الظروف؟',
      image: 'assets/images/tomato-farm.jpg',
      answers: [
        {
          id: 1,
          text: 'زيادة كمية الأسمدة النيتروجينية',
          correct: false,
          explanation: 'بينما قد تساعد الأسمدة النيتروجينية في نمو النبات، إلا أنها لا تعالج العامل المحدد الرئيسي في هذه الحالة.',
          selected: false
        },
        {
          id: 2,
          text: 'إضافة مصابيح إضاءة إضافية للنباتات',
          correct: false,
          explanation: 'المنطقة لديها بالفعل شمس ساطعة، لذا فإن إضافة المزيد من الضوء لن يزيد بشكل كبير من معدل التمثيل الضوئي.',
          selected: false
        },
        {
          id: 3,
          text: 'زيادة تركيز ثاني أكسيد الكربون حول النباتات',
          correct: false,
          explanation: 'في البيئة المفتوحة، زيادة تركيز ثاني أكسيد الكربون ليست استراتيجية فعالة من حيث التكلفة وقد تكون صعبة التنفيذ.',
          selected: false
        },
        {
          id: 4,
          text: 'تحسين نظام الري لتوفير كمية كافية من الماء للنباتات',
          correct: true,
          explanation: 'صحيح! في منطقة ذات أمطار قليلة، الماء سيكون العامل المحدد الرئيسي للتمثيل الضوئي. بدون كمية كافية من الماء، لا يمكن للنباتات الحفاظ على فتح الثغور، مما يحد من دخول ثاني أكسيد الكربون ويقلل من معدل التمثيل الضوئي.',
          selected: false
        }
      ],
      completed: false
    },
    {
      id: 3,
      title: 'تصميم مساحة خضراء داخلية',
      description: 'أنت مصمم داخلي تعمل على تصميم مساحة خضراء داخل مبنى مكتبي كبير. تريد اختيار النباتات التي ستزدهر في بيئة داخلية مع إضاءة صناعية.',
      question: 'بناءً على فهمك لعملية التمثيل الضوئي، أي من النباتات التالية ستكون الأنسب لهذه البيئة؟',
      image: 'assets/images/indoor-plants.jpg',
      answers: [
        {
          id: 1,
          text: 'نباتات تحتاج إلى ضوء الشمس المباشر طوال اليوم',
          correct: false,
          explanation: 'هذه النباتات ستكون غير مناسبة للبيئة الداخلية حيث تكون الإضاءة الصناعية أقل كثافة من ضوء الشمس المباشر.',
          selected: false
        },
        {
          id: 2,
          text: 'نباتات تكيفت مع مستويات منخفضة من الضوء مثل بعض النباتات الاستوائية',
          correct: true,
          explanation: 'صحيح! النباتات التي تطورت للعيش تحت مظلة الغابات الاستوائية تكيفت مع مستويات إضاءة منخفضة. لديها صبغات إضافية لالتقاط الضوء بكفاءة وتستطيع القيام بالتمثيل الضوئي في ظروف الإضاءة المنخفضة مثل البيئات الداخلية.',
          selected: false
        },
        {
          id: 3,
          text: 'محاصيل زراعية مثل الطماطم والفلفل',
          correct: false,
          explanation: 'المحاصيل الزراعية عادة ما تتطلب مستويات عالية من الضوء لإنتاج الثمار وستكافح في بيئة داخلية بإضاءة صناعية.',
          selected: false
        },
        {
          id: 4,
          text: 'النباتات الصحراوية مثل الصبار',
          correct: false,
          explanation: 'بينما يمكن للصبار أن ينمو في ظروف داخلية، إلا أنه متكيف مع بيئات مشمسة جداً. ستحتاج إلى إضاءة أكثر مما هو متاح عادة في المكاتب.',
          selected: false
        }
      ],
      completed: false
    }
  ];
  
  get currentStep() {
    return this.scenarioSteps[this.currentStepIndex];
  }
  
  constructor() { }
  
  ngOnInit(): void {
  }
  
  selectAnswer(answer: Answer): void {
    // Reset all selections first
    this.currentStep.answers.forEach(a => a.selected = false);
    
    // Then set the current selection
    answer.selected = true;
    
    // Show feedback
    this.isCorrect = answer.correct;
    this.feedbackText = answer.explanation;
    this.showFeedback = true;
    
    // Mark step as completed
    this.currentStep.completed = true;
    
    // Update score
    if (answer.correct) {
      this.currentScore += Math.floor(this.maxScore / this.scenarioSteps.length);
    }
    
    // Check if all steps are completed
    this.checkCompletion();
  }
  
  nextStep(): void {
    if (this.currentStepIndex < this.scenarioSteps.length - 1) {
      this.currentStepIndex++;
      this.showFeedback = false;
    } else {
      this.isCompleted = true;
      this.challengeCompleted.emit(5); // Challenge ID
      this.scoreEarned.emit(this.currentScore);
    }
  }
  
  prevStep(): void {
    if (this.currentStepIndex > 0) {
      this.currentStepIndex--;
      this.showFeedback = this.currentStep.completed;
      if (this.showFeedback) {
        const selectedAnswer = this.currentStep.answers.find(a => a.selected);
        if (selectedAnswer) {
          this.isCorrect = selectedAnswer.correct;
          this.feedbackText = selectedAnswer.explanation;
        }
      }
    }
  }
  
  checkCompletion(): void {
    const allCompleted = this.scenarioSteps.every(step => step.completed);
    if (allCompleted) {
      this.isCompleted = true;
    }
  }
  
  restartChallenge(): void {
    this.currentStepIndex = 0;
    this.currentScore = 0;
    this.isCompleted = false;
    this.showFeedback = false;
    
    this.scenarioSteps.forEach(step => {
      step.completed = false;
      step.answers.forEach(answer => answer.selected = false);
    });
  }
}
