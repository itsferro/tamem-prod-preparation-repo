import { TamemService } from '@/app/core/service/tamem-service.service';
import { Component, inject, Input, OnInit, SimpleChanges } from '@angular/core'
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap'
import { take } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'detail-curriculum',
  standalone: true,
  imports: [NgbAccordionModule, CommonModule],
  templateUrl: './curriculum.component.html',
  styleUrls: ['./curriculum.component.scss'],
})
export class CurriculumComponent {
  @Input() subjectData: any = null;
  @Input() isDropdown: boolean = false;
  
  curriculumList: any;
  subjectInfo: any = null;
  
  // Track selected, completed, and viewed lessons
  selectedLessonId: number | null = null;
  completedLessonIds: number[] = [];
  viewedLessonIds: number[] = [];

  ngOnInit() {
    // In a real app, you'd load completed lessons from a service
    // This is just for demonstration
    this.loadUserProgress();
  }
  
  ngOnChanges(changes: SimpleChanges) {
    if (changes['subjectData'] && changes['subjectData'].currentValue) {
      this.curriculumList = this.subjectData.curriculumList;
      this.subjectInfo = this.subjectData.subjectInfo;
      
      // If no lesson is selected, select the first available
      if (!this.selectedLessonId && this.curriculumList?.length > 0) {
        const firstModule = this.curriculumList[0];
        if (firstModule.lectures?.length > 0) {
          this.selectedLessonId = firstModule.lectures[0].id;
        }
      }
    }
  }
  
  // Method to select a lesson
  selectLesson(lessonId: number) {
    this.selectedLessonId = lessonId;
    
    // Add to viewed lessons if not already viewed
    if (!this.viewedLessonIds.includes(lessonId)) {
      this.viewedLessonIds.push(lessonId);
    }
  }
  
  // Method to mark a lesson as completed
  completeLesson(lessonId: number) {
    if (!this.completedLessonIds.includes(lessonId)) {
      this.completedLessonIds.push(lessonId);
      // In a real app, you'd save this to a service
      this.saveUserProgress();
    }
  }
  
  // Check if a lesson is completed
  isLessonCompleted(lecture: any): boolean {
    return this.completedLessonIds.includes(lecture.id);
  }
  
  // Get appropriate status class for the lesson button
  getLessonStatusClass(lecture: any): string {
    if (this.isLessonCompleted(lecture)) {
      return 'btn btn-light-success btn-round btn-sm mb-0 position-static';
    } else if (this.selectedLessonId === lecture.id) {
      return 'btn btn-light-primary btn-round btn-sm mb-0 position-static';
    } else if (this.isNextToUnlock(lecture)) {
      return 'btn btn-light-warning btn-round btn-sm mb-0 position-static';
    } else {
      return 'btn btn-danger-soft btn-round btn-sm mb-0 position-static';
    }
  }
  
  // Get appropriate icon for the lesson button
  getLessonStatusIcon(lecture: any): string {
    if (this.isLessonCompleted(lecture)) {
      return 'fas fa-check me-0';
    } else if (this.selectedLessonId === lecture.id) {
      return 'fas fa-play me-0';
    } else if (this.isNextToUnlock(lecture)) {
      return 'fas fa-unlock me-0';
    } else {
      return 'fas fa-lock me-0';
    }
  }
  
  // Calculate module progress percentage
  getModuleProgress(module: any): number {
    if (!module.lectures || module.lectures.length === 0) {
      return 0;
    }
    
    const totalLessons = module.lectures.length;
    const completedLessons = module.lectures.filter(
      (lecture: any) => this.isLessonCompleted(lecture)
    ).length;
    
    return Math.round((completedLessons / totalLessons) * 100);
  }
  
  // Check if a lesson is the next one to unlock
  isNextToUnlock(lecture: any): boolean {
    // If already completed or selected, it's not "next to unlock"
    if (this.isLessonCompleted(lecture) || this.selectedLessonId === lecture.id) {
      return false;
    }
    
    // Find the module and lesson index
    let previousLessonCompleted = true;
    
    for (const module of this.curriculumList) {
      for (const currentLecture of module.lectures) {
        // If we've reached our target lecture
        if (currentLecture.id === lecture.id) {
          return previousLessonCompleted;
        }
        
        // Update the state for the next iteration
        previousLessonCompleted = this.isLessonCompleted(currentLecture);
      }
    }
    
    return false;
  }
  
  // Demo methods to simulate loading/saving progress
  // In a real app, these would interact with your TamemService
  private loadUserProgress() {
    // For demo purposes only - you'd load from an API
    const savedProgress = localStorage.getItem('userProgress');
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      this.completedLessonIds = progress.completedLessonIds || [];
      this.viewedLessonIds = progress.viewedLessonIds || [];
    }
  }
  
  private saveUserProgress() {
    // For demo purposes only - you'd save to an API
    const progress = {
      completedLessonIds: this.completedLessonIds,
      viewedLessonIds: this.viewedLessonIds
    };
    localStorage.setItem('userProgress', JSON.stringify(progress));
  }
}