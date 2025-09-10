import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'detail-lesson-statistics',
  standalone: true,
  imports: [],
  templateUrl: './lesson-statistics.component.html',
  styleUrl: './lesson-statistics.component.scss'
})
export class LessonStatisticsComponent implements OnInit {
  @Input() lesson: any;
  @Input() userProgress: any;
  @Input() platformStats: any;
  
  // Default data in case no inputs are provided
  defaultLesson = {
    id: 'lesson1_2',
    title: 'العمليات الأساسية',
    category: 'أساسيات الجبر',
    duration: '20 دقيقة',
    totalSections: 6
  };
  
  defaultUserProgress = {
    completionPercentage: 65,
    timeSpent: '45:20',
    visits: 3,
    correctAnswers: 75,
    completedChallenges: 4,
    totalChallenges: 6,
    strengths: ['التعامل مع المتغيرات', 'حل المعادلات البسيطة'],
    weaknesses: ['ترتيب العمليات الحسابية', 'التعامل مع المعادلات المركبة']
  };
  
  defaultPlatformStats = {
    totalStudents: 1245,
    completionRate: 85,
    difficulty: 2, // 1-5 scale
    yourPercentile: 65,
    averagePercentile: 50,
    topPercentile: 85,
    challengePoints: [
      {
        name: 'التعامل مع الكسور الجبرية',
        difficulty: 'صعوبة عالية',
        successRate: 35
      },
      {
        name: 'حل المعادلات متعددة المتغيرات',
        difficulty: 'صعوبة متوسطة',
        successRate: 62
      }
    ],
    recommendations: [
      {
        type: 'exercise',
        title: 'تمارين مقترحة',
        description: 'تدرب على "ترتيب العمليات الحسابية" لتحسين فهمك للموضوع',
        icon: 'tasks',
        linkText: 'ابدأ التمرين',
        linkUrl: '#exercises/123'
      },
      {
        type: 'lesson',
        title: 'درس متعلق',
        description: 'راجع درس "العمليات الأساسية في الجبر" لتعزيز المفاهيم',
        icon: 'book-reader',
        linkText: 'فتح الدرس',
        linkUrl: '#lesson/456'
      },
      {
        type: 'challenge',
        title: 'التحدي التالي',
        description: 'جرب حل مسائل معقدة أكثر لاختبار استيعابك',
        icon: 'trophy',
        linkText: 'بدء التحدي',
        linkUrl: '#challenge/789'
      }
    ]
  };

  constructor() {}

  ngOnInit() {
    // Use default values if inputs aren't provided
    this.lesson = this.lesson || this.defaultLesson;
    this.userProgress = this.userProgress || this.defaultUserProgress;
    this.platformStats = this.platformStats || this.defaultPlatformStats;
  }

  // Helper method to get difficulty dots array
  getDifficultyDots(level: number): boolean[] {
    const dots = [];
    const maxLevel = 5;
    
    for (let i = 0; i < maxLevel; i++) {
      dots.push(i < level);
    }
    
    return dots;
  }

  // Method to handle recommendation clicks
  onRecommendationClick(recommendation: any) {
    console.log('Recommendation clicked:', recommendation);
    // This could navigate to the recommended content or trigger specific actions
    // based on the recommendation type
  }

  // Method to track progress changes
  updateProgress(newProgress: any) {
    this.userProgress = { ...this.userProgress, ...newProgress };
    console.log('Progress updated:', this.userProgress);
  }
}