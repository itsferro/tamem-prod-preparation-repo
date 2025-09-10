import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CdkDragDrop, moveItemInArray, DragDropModule } from '@angular/cdk/drag-drop';

export interface Scene {
  id: number;
  name: string;
  color: string;
  description?: string;
}

export interface StoryboardFrame {
  id: number;
  sceneId: number;
  title: string;
  description: string;
  imageUrl?: string;
  notes: string;
  extraReq: string;
  duration: string;
  actions: {
    camera: boolean;
    download: boolean;
    share: boolean;
    delete: boolean;
  };
}

@Component({
  selector: 'block-managment-insight-scenes',
  standalone: true,
  imports: [CommonModule, FormsModule, DragDropModule],
  templateUrl: './scenes.component.html',
  styleUrl: './scenes.component.scss'
})
export class BlockManagmentInsightScenesComponent {
  
  scenes: Scene[] = [
    { id: 1, name: 'مشهد البداية', color: '#27ae60', description: 'مشاهد تمهيدية وتعريفية' },
    { id: 2, name: 'مشهد التطوير', color: '#3498db', description: 'تطوير الأحداث والشخصيات' },
    { id: 3, name: 'مشهد الذروة', color: '#e74c3c', description: 'اللحظات الحاسمة والمواجهات' },
    { id: 4, name: 'مشهد النهاية', color: '#9b59b6', description: 'الخلاصة والنتائج' },
    { id: 5, name: 'مشاهد إضافية', color: '#95a5a6', description: 'مشاهد تكميلية ومراجعة' }
  ];

  storyboardFrames: StoryboardFrame[] = [
    {
      id: 1,
      sceneId: 1,
      title: 'مشهد بداية الأحداث - إطار رقم 1',
      description: 'يظهر المدير بنادر لشركة مع أعضاء فريقه وهما يجلسون حول طاولة في قاعة الاجتماعات. يتناقشون حول الخطة الاستراتيجية الجديدة للعام القادم.',
      imageUrl: 'assets/images/frame1.jpg',
      notes: 'الإضاءة الطبيعية جيدة. اللقطة الطويلة',
      extraReq: 'Extra Req',
      duration: '00:00:15',
      actions: {
        camera: true,
        download: true,
        share: true,
        delete: true
      }
    },
    {
      id: 2,
      sceneId: 1,
      title: 'جدول الأعمال الأساسية - إطار 2',
      description: 'الكاميرا في حركة بطيئة تركز على الوجوه. رسم جدول الأعمال الأساسية المعتمدة بطريقة مكبرة لعرض التفاصيل بوضوح مع التعبيرات الجدية للأعضاء.',
      imageUrl: 'assets/images/frame2.jpg',
      notes: 'جدول الأعمال الأساسية',
      extraReq: 'Extra Req',
      duration: '00:01:30',
      actions: {
        camera: true,
        download: true,
        share: true,
        delete: true
      }
    },
    {
      id: 3,
      sceneId: 1,
      title: 'إضافة خلفية الأحداث في الجدول - إطار 3',
      description: 'إضافة خلفية الأحداث في الجدول ومع أطفال يلعبون بالأغراض والتفاصيل الأخرى في خلفية الأحداث والمشاعر الدرامية والمنطقية.',
      imageUrl: 'assets/images/frame3.jpg',
      notes: 'خلفية الأحداث والمشاعر الدرامية والمنطقية',
      extraReq: 'Extra Req',
      duration: '00:02:45',
      actions: {
        camera: true,
        download: true,
        share: true,
        delete: true
      }
    },
    {
      id: 4,
      sceneId: 2,
      title: 'قراءة ملاحظة التقسيم - إطار 4',
      description: 'أعرض ملاحظة تقسيم ترجمة الى جدول الأعمال الأساسية بما يتم أطغام ملاحظة جانبية حاضرة للاستخدام.',
      imageUrl: 'assets/images/frame4.jpg',
      notes: 'Notes',
      extraReq: 'Extra Req',
      duration: '00:03:20',
      actions: {
        camera: true,
        download: true,
        share: true,
        delete: true
      }
    },
    {
      id: 5,
      sceneId: 2,
      title: 'مشهد نهاية المقطع - إطار 5',
      description: 'مشهد أخير 10,000 في جدول الأعمال الأساسية. أراء ربحية وتكريمة في خدمة الأوروبا الأولى في العالم الإفريقي جاهزة للتقييم للإصدار الرقم اثنان فيه الأهمية جامعة حجارة الأحياء الأهمية.',
      imageUrl: 'assets/images/frame5.jpg',
      notes: '10,000 = هجرة إلى',
      extraReq: 'Extra Req',
      duration: '00:04:10',
      actions: {
        camera: true,
        download: true,
        share: true,
        delete: true
      }
    },
    {
      id: 6,
      sceneId: 2,
      title: 'مشهد إضافي للمراجعة - إطار 6',
      description: 'مشهد إضافي يظهر فيه المراجعة النهائية للمشروع والتحضيرات الأخيرة قبل التنفيذ.',
      imageUrl: 'assets/images/frame6.jpg',
      notes: 'Notes',
      extraReq: 'Extra Req',
      duration: '00:05:00',
      actions: {
        camera: true,
        download: true,
        share: true,
        delete: true
      }
    },
    {
      id: 7,
      sceneId: 3,
      title: 'مشهد الختام والتقييم - إطار 7',
      description: 'المشهد الختامي الذي يوضح نتائج المشروع والتقييم النهائي من قبل الفريق.',
      imageUrl: 'assets/images/frame7.jpg',
      notes: 'Notes',
      extraReq: 'Extra Req',
      duration: '00:06:15',
      actions: {
        camera: true,
        download: true,
        share: true,
        delete: true
      }
    },
    {
      id: 8,
      sceneId: 3,
      title: 'مشهد إضافي للنهاية - إطار 8',
      description: 'مشهد نهائي إضافي يعرض الخلاصة والتوصيات المستقبلية.',
      imageUrl: 'assets/images/frame8.jpg',
      notes: 'Notes',
      extraReq: 'Extra Req',
      duration: '00:07:30',
      actions: {
        camera: true,
        download: true,
        share: true,
        delete: true
      }
    }
  ];

  selectedFrame: StoryboardFrame | null = null;
  isDragging = false;

  constructor() { }

  onFrameClick(frame: StoryboardFrame): void {
    if (!this.isDragging) {
      this.selectedFrame = frame;
    }
  }

  onPreviousFrame(): void {
    if (this.selectedFrame) {
      const currentIndex = this.storyboardFrames.findIndex(f => f.id === this.selectedFrame!.id);
      if (currentIndex > 0) {
        this.selectedFrame = this.storyboardFrames[currentIndex - 1];
      }
    }
  }

  onNextFrame(): void {
    if (this.selectedFrame) {
      const currentIndex = this.storyboardFrames.findIndex(f => f.id === this.selectedFrame!.id);
      if (currentIndex < this.storyboardFrames.length - 1) {
        this.selectedFrame = this.storyboardFrames[currentIndex + 1];
      }
    }
  }

  onActionClick(action: string, frame: StoryboardFrame, event: Event): void {
    event.stopPropagation();
    console.log(`${action} clicked for frame ${frame.id}`);
    // Implement your action logic here
  }

  closeModal(): void {
    this.selectedFrame = null;
  }

  // Drag and Drop functionality
  drop(event: CdkDragDrop<StoryboardFrame[]>): void {
    if (event.previousIndex !== event.currentIndex) {
      moveItemInArray(this.storyboardFrames, event.previousIndex, event.currentIndex);
      this.updateFrameOrderAndScenes(event.currentIndex);
    }
    this.isDragging = false;
  }

  onDragStarted(): void {
    this.isDragging = true;
  }

  onDragEnded(): void {
    setTimeout(() => {
      this.isDragging = false;
    }, 100);
  }

  onDragMoved(event: any): void {
    // This will be called during drag to update placeholder position
  }

  private updateFrameOrderAndScenes(newIndex: number): void {
    // Update frame IDs based on new order
    this.storyboardFrames.forEach((frame, index) => {
      frame.id = index + 1;
    });

    // Update scene assignment for the moved frame
    this.updateMovedFrameScene(newIndex);
  }

  private updateMovedFrameScene(movedFrameIndex: number): void {
    const movedFrame = this.storyboardFrames[movedFrameIndex];
    
    if (movedFrameIndex === 0) {
      // If moved to first position, take scene from next frame (if exists)
      if (this.storyboardFrames.length > 1) {
        movedFrame.sceneId = this.storyboardFrames[1].sceneId;
      }
    } else {
      // Take scene from previous frame
      movedFrame.sceneId = this.storyboardFrames[movedFrameIndex - 1].sceneId;
    }
  }

  getFrameScene(frame: StoryboardFrame): Scene | undefined {
    return this.scenes.find(scene => scene.id === frame.sceneId);
  }

  getFrameColorClass(frame: StoryboardFrame): string {
    const scene = this.getFrameScene(frame);
    return scene ? `frame-scene-${scene.id}` : 'frame-default';
  }

  getFrameBorderColor(frame: StoryboardFrame): string {
    const scene = this.getFrameScene(frame);
    return scene ? scene.color : '#95a5a6';
  }

  getSceneName(frame: StoryboardFrame): string {
    const scene = this.getFrameScene(frame);
    return scene ? scene.name : 'غير محدد';
  }

  // Group frames by scene for display purposes
  getFramesByScene(): { scene: Scene; frames: StoryboardFrame[] }[] {
    return this.scenes.map(scene => ({
      scene,
      frames: this.storyboardFrames.filter(frame => frame.sceneId === scene.id)
    })).filter(group => group.frames.length > 0);
  }
}