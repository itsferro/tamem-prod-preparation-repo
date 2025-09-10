import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Resource {
  title: string;
  url: string;
}

export interface StoryboardFrameData {
  id: string | number;
  title?: string;
  imageUrl?: string;
  visualContentNotes?: string;
  voiceoverText?: string;
  onScreenText?: string;
  notes?: string;
  resources?: Resource[];
  duration?: number;
  contentType?: 'image' | 'video' | 'animation' | 'text';
  lastModified?: Date;
}

@Component({
  selector: 'detail-lesson-block-test',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lesson-block-test.component.html',
  styleUrl: './lesson-block-test.component.scss'
})
export class LessonBlockTestComponent implements OnInit {
  @Input() frameData: StoryboardFrameData = {
    id: 0,
    resources: []
  };
  
  @Input() frameNumber: number = 1;

  @Output() contentUpdated = new EventEmitter<{frame: StoryboardFrameData, field: string}>();
  @Output() fileUploaded = new EventEmitter<{frame: StoryboardFrameData, file: File}>();
  @Output() frameDeleted = new EventEmitter<StoryboardFrameData>();
  @Output() frameMoved = new EventEmitter<{frame: StoryboardFrameData, direction: number}>();

  newResourceUrl: string = '';

  constructor() {}

  ngOnInit(): void {
    // Initialize resources array if not present
    if (!this.frameData.resources) {
      this.frameData.resources = [];
    }
    
    // Initial height adjustment
    setTimeout(() => {
     // this.equalizeRowHeights();
    }, 0);
  }

  onContentChanged(field: string): void {
    this.frameData.lastModified = new Date();
    this.contentUpdated.emit({
      frame: this.frameData,
      field: field
    });
  }

  onDeleteFrame(): void {
    if (confirm('هل أنت متأكد من حذف هذه اللقطة؟')) {
      this.frameDeleted.emit(this.frameData);
    }
  }

  onMoveFrame(direction: number): void {
    this.frameMoved.emit({
      frame: this.frameData,
      direction: direction
    });
  }
  
  onDuplicateFrame(): void {
    // Emitting generic event using frameEdited event for now
    // You can create a separate event if needed
    if (confirm('هل تريد نسخ هذه اللقطة؟')) {
      // this.frameEdited.emit({...this.frameData, id: `duplicate_${this.frameData.id}`});
    }
  }
  

  
  // Auto-grow functionality for textareas
autoGrow(event: any): void {
  const element = event.target as HTMLTextAreaElement;
  element.style.height = "40px";
  element.style.height = (element.scrollHeight) + "px";
  
  // Maintain equal height for all fields with the same class as the current field
  this.equalizeRowHeights(element);
}

// Maintain equal heights for widgets with the same class as the active field
equalizeRowHeights(activeElement: HTMLTextAreaElement): void {
  // Use setTimeout to ensure this runs after DOM updates
  setTimeout(() => {
    // Get the class that we want to match (besides 'expand-field')
    const relevantClass = Array.from(activeElement.classList)
      .find(cls => cls !== 'expand-field');
    
    if (!relevantClass) return; // Exit if no special class found
    
    // Select all textareas with the same relevant class
    const selector = `.storyboard-frame .content-field textarea.${relevantClass}`;
    const matchingTextareas = document.querySelectorAll<HTMLTextAreaElement>(selector);
    
    // Reset heights to auto first
    matchingTextareas.forEach(textarea => {
      textarea.style.height = 'auto';
    });
    
    // Calculate max height among these specific textareas
    const maxHeight = Math.max(
      ...Array.from(matchingTextareas)
        .map(textarea => textarea.scrollHeight)
    );
    
    // Apply max height to only the specific textareas
    matchingTextareas.forEach(textarea => {
      textarea.style.height = Math.max(40, maxHeight) + 'px';
    });
  }, 0);
}





  onSelectImage(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    
    // Open file selection dialog
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e: any) => this.onImageSelected(e);
    input.click();
  }

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      // Create a temporary URL for preview
      this.frameData.imageUrl = URL.createObjectURL(file);
      
      // Emit event for parent component to handle actual upload
      this.fileUploaded.emit({
        frame: this.frameData,
        file: file
      });
      
      this.onContentChanged('imageUrl');
    }
  }

  addResource(): void {
    if (this.newResourceUrl && this.newResourceUrl.trim()) {
      // Create a new resource
      const newResource: Resource = {
        title: this.newResourceUrl.split('/').pop() || this.newResourceUrl,
        url: this.newResourceUrl
      };
      
      // Add to resources array
      if (!this.frameData.resources) {
        this.frameData.resources = [];
      }
      
      this.frameData.resources.push(newResource);
      
      // Clear input
      this.newResourceUrl = '';
      
      // Notify about change
      this.onContentChanged('resources');
    }
  }


   

}