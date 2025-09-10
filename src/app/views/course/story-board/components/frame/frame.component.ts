import { Component, Input, Output, EventEmitter, OnInit, SimpleChanges, inject, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImagePrompotComponent } from '../image-prompot/image-prompot.component';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

interface Resource {
  title: string;
  url: string;
}


export interface StoryboardFrameData {
  id: string | number;
  title?: string;
  imageUrl?: string;
  imagePrompt?: string | string[];
  sceneImagePrompt?: string;
  sceneLayoutType?: string;
  visualContentNotes?: string;
  voiceoverText?: string;
  onScreenText?: string;
  notes?: string;
  extraReq?: string;
  resources?: Resource[];
  duration?: number;
  contentType?: 'image' | 'video' | 'animation' | 'text';
  lastModified?: Date;
  // New properties
  sceneId?: number;
  sceneTitle?: string;
  sceneColor?: string;
}


export interface StoryboardFrameData2 {
  id: string | number;
  title?: string;
  imageUrl?: string;
  imagePrompt?: string | string[];
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
  selector: 'story-board-frame',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './frame.component.html',
  styleUrl: './frame.component.scss'
})
export class FrameComponent implements OnInit {
  @Input() frameData: StoryboardFrameData = {
    id: 0,
    resources: []
  };

  @Input() blockContent: any;
  
  @Input() frameNumber: number = 1;

  @Output() contentUpdated = new EventEmitter<{frame: StoryboardFrameData, field: string}>();
  @Output() fileUploaded = new EventEmitter<{frame: StoryboardFrameData, file: File}>();
  @Output() frameDeleted = new EventEmitter<StoryboardFrameData>();
  @Output() frameMoved = new EventEmitter<{frame: StoryboardFrameData, direction: number}>();

  newResourceUrl: string = '';
  
  // Image preview state
  previewImageUrl: SafeUrl | null = null;
  
  // Inject sanitizer for URL handling
  private sanitizer = inject(DomSanitizer);
  
  // Base URL of the application, used for relative paths
  private baseUrl: string = '';

  constructor() {
    // Get base URL from window.location
    this.baseUrl = window.location.origin;
  }

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
  
  // Function to handle image URL transformation
  getImageUrl(url: string | undefined): SafeUrl | string {
    if (!url) return '';
    
    // If it's already a data URL (from file upload preview) or absolute URL, return as is
    if (url.startsWith('data:') || url.startsWith('http://') || url.startsWith('https://')) {
      return this.sanitizer.bypassSecurityTrustUrl(url);
    }
    
    // If it's a relative URL starting with /storage
    if (url.startsWith('/storage')) {
      // Try to convert to absolute URL using the base URL
      const absoluteUrl = `${this.baseUrl}${url}`;
      return this.sanitizer.bypassSecurityTrustUrl(absoluteUrl);
    }
    
    // For other cases, return the URL as is
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
  
  // Handle image loading errors
  handleImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    
    // If the image failed to load, try an alternative URL format
    if (imgElement.src && imgElement.src.startsWith(this.baseUrl) && imgElement.src.includes('/storage/')) {
      // Try the URL without the base origin
      const relativePath = imgElement.src.replace(this.baseUrl, '');
      imgElement.src = relativePath;
      
      console.log(`Retrying image with relative path: ${relativePath}`);
      
      // Add a backup error handler for the second attempt
      imgElement.onerror = () => {
        console.error(`Failed to load image with both absolute and relative paths: ${this.frameData.imageUrl}`);
        imgElement.src = 'assets/images/placeholder.png';  // Use a placeholder image
        imgElement.onerror = null; // Remove error handler to prevent loops
      };
    } else {
      // If already tried relative or it's another format, use placeholder
      console.error(`Failed to load image: ${imgElement.src}`);
      imgElement.src = 'assets/images/placeholder.png';
      imgElement.onerror = null; // Remove error handler to prevent loops
    }
  }
  
  /**
   * Open the image preview modal when clicking on the frame image
   */
  openImagePreview(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    
    if (this.frameData.imageUrl) {
      // Use the same URL transformation as for the thumbnail
      this.previewImageUrl = this.getImageUrl(this.frameData.imageUrl);
    }
  }
  
  /**
   * Close the image preview modal
   */
  closeImagePreview(): void {
    this.previewImageUrl = null;
  }

  private el = inject(ElementRef);
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['frameData']) {
      // Wait for Angular to render the updated template
      setTimeout(() => {
        // Find all textareas in this component and adjust their heights
        const textareas = this.el.nativeElement.querySelectorAll('textarea');
        textareas.forEach((textarea: HTMLTextAreaElement) => {
          this.autoGrow({ target: textarea });
        });
      }, 0);
    }
  }
  
  autoGrow(event: any): void {
    const element = event.target as HTMLTextAreaElement;
    
    // Find the relevant class (excluding 'expand-field')
    const relevantClass = Array.from(element.classList)
      .find(cls => cls !== 'expand-field');
    
    if (!relevantClass) return;
  
    // Select all textareas with the same relevant class
    const selector = `.storyboard-frame .content-field textarea.${relevantClass}`;
    const matchingTextareas = document.querySelectorAll<HTMLTextAreaElement>(selector);
    
    // Reset heights to auto first
    matchingTextareas.forEach(textarea => {
      textarea.style.height = '40px';
    });
    
    // Calculate max height among these specific textareas
    const maxHeight = Math.max(
      ...Array.from(matchingTextareas)
        .map(textarea => textarea.scrollHeight)
    );
    
    // Apply max height to only the specific textareas
    matchingTextareas.forEach(textarea => {
      textarea.style.height = `${Math.max(40, maxHeight)}px`;
    });
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
         textarea.style.height = '40';
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

  private modal = inject(NgbModal);

  // Add this method to open the image prompt modal with the updated size settings
  openImagePromptModal(): void {
    const modalRef = this.modal.open(ImagePrompotComponent, {
      size: 'lg',
      centered: true,
      backdrop: true,
      animation: true
    });
    
    // Pass data to the modal
    modalRef.componentInstance.frameData = this.frameData;
    modalRef.componentInstance.blockContent = this.blockContent;
    
    // Handle the result when modal is closed
    modalRef.result.then(
      (result) => {
        // If a prompt was selected and returned
        if (result && result.prompt) {
          // Update the frame with the image prompt
          this.frameData.imagePrompt = result.prompt;
          
          // Notify about the change
          this.onContentChanged('imagePrompt');
        }
      },
      () => {
        // Modal dismissed, no action needed
      }
    );
  }
 
  // Type guard to check if prompt is a string
  isStringPrompt(prompt: string | string[] | undefined): prompt is string {
    return typeof prompt === 'string';
  }

  // Method to safely get an array of prompts
  getPromptArray(prompt: string | string[] | undefined): string[] {
    if (Array.isArray(prompt)) {
      return prompt;
    }
    return prompt ? [prompt] : [];
  }

  // Unified method to handle image prompt copying
  handleImagePromptCopy(event: Event, prompt: string): void {
    event.preventDefault();
    event.stopPropagation();
    
    if (!prompt) return;
    
    // Copy text to clipboard
    navigator.clipboard.writeText(prompt)
      .then(() => {
        // Find the clicked element
        const target = event.currentTarget as HTMLElement;
        
        // Store original HTML
        const iconElement = target.querySelector('i');
        const originalIcon = iconElement?.className;
        
        // Change icon temporarily
        if (iconElement) {
          iconElement.className = 'fas fa-check';
        }
        target.classList.add('copied');
        
        // Restore original state after delay
        setTimeout(() => {
          target.classList.remove('copied');
          if (iconElement && originalIcon) {
            iconElement.className = originalIcon;
          }
        }, 1500);
      })
      .catch(err => {
        console.error('Could not copy text: ', err);
        
        // Error visual feedback
        const target = event.currentTarget as HTMLElement;
        const iconElement = target.querySelector('i');
        
        if (iconElement) {
          iconElement.className = 'fas fa-times';
        }
        
        // Restore original after delay
        setTimeout(() => {
          if (iconElement) {
            iconElement.className = 'fas fa-image';
          }
        }, 1500);
      });
  }
}