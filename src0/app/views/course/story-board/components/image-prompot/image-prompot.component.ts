import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TamemService } from '@/app/core/service/tamem-service.service';
import { StoryboardFrameData } from '../frame/frame.component';

interface ImageSettings {
  key: string;
  name: string;
  value: string;
  options?: string[];
  type: 'select' | 'text' | 'color' | 'range';
  active: boolean;
}

type TabType = 'settings' | 'prompts' | 'gallery';

@Component({
  selector: 'story-board-image-prompot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './image-prompot.component.html',
  styleUrl: './image-prompot.component.scss'
})
export class ImagePrompotComponent implements OnInit {
  @Input() frameData!: StoryboardFrameData;
  @Input() blockContent: string = '';

  private activeModal = inject(NgbActiveModal);
  private tamemService = inject(TamemService);

  activeTab: TabType = 'settings';
  isGenerating: boolean = false;
  errorMessage: string | null = null;
  generatedPrompts: string[] = [];
  selectedPromptIndex: number = -1;

  // New properties for gallery
  uploadedImages: { url: string; name: string }[] = [];
  isUploading: boolean = false;
  uploadError: string | null = null;

  currentImageIndex: number = 0;

  previewImageUrl: string | null = null;



  ngOnInit(): void {

    this.loadImagePrompts() ; 
    
  }

  /**
   * Set the active tab
   */
  setActiveTab(tab: TabType): void {
    this.activeTab = tab;
  }

  onVisualContentChanged(event: any): void {
    // Auto-resize textarea if needed
    const element = event.target as HTMLTextAreaElement;
    if (element.scrollHeight > element.clientHeight) {
      element.style.height = Math.min(120, element.scrollHeight) + 'px';
    }
  }


  generateImagePrompts(): void {
    this.isGenerating = true;
    this.errorMessage = null;

    const content = this.frameData.sceneImagePrompt;
    const style = 'whiteboard animation';
    const layout = this.frameData.sceneLayoutType;
    // Call service to generate prompts
    this.isGenerating = false;

    //  this.generatedPrompts = response.prompts;

    // Get the current text from the textarea
    const textareaContent = this.frameData.sceneImagePrompt;

    // Check if the textarea has content
    if (!textareaContent || textareaContent.trim() === '') {
      console.error('Please enter some content in the textarea');
      return;
    }

    // Replace the hardcoded text with the textarea content
    var retPrompts = [
      textareaContent
    ];

    // Initialize this.generatedPrompts if it doesn't exist yet
    if (!this.generatedPrompts) {
      this.generatedPrompts = [];
    }

    // Append the new prompt to existing prompts
    this.generatedPrompts = [
      ...this.generatedPrompts,
      ...retPrompts
    ];



    this.selectedPromptIndex = 0; // Select first by default

    // Switch to prompts tab after generation
    this.setActiveTab('prompts');


    this.frameData.sceneImagePrompt = '' ; 
  }





  generateImagePrompts2(): void {
    this.isGenerating = true;
    this.errorMessage = null;

    const content = this.frameData.sceneImagePrompt;
    const style = 'whiteboard animation';
    const layout = this.frameData.sceneLayoutType;
    // Call service to generate prompts
    this.tamemService.generateImagePrompts(content, style, layout).subscribe({
      next: (response) => {
        this.isGenerating = false;

        if (response && response.prompts && response.prompts.length > 0) {
          this.generatedPrompts = response.prompts;
          this.selectedPromptIndex = 0; // Select first by default

          // Switch to prompts tab after generation
          this.setActiveTab('prompts');
        } else {
          this.errorMessage = 'لم يتم الحصول على اقتراحات من الخدمة.';
        }
      },
      error: (error) => {
        this.isGenerating = false;
        this.errorMessage = 'فشل في توليد اقتراحات الصور. يرجى المحاولة مرة أخرى.';
        console.error('Error generating image prompts:', error);
      }
    });
  }

  toggleSetting(setting: ImageSettings): void {
    setting.active = !setting.active;
  }

  navigateCarousel(direction: number): void {
    const newIndex = this.selectedPromptIndex + direction;
    if (newIndex >= 0 && newIndex < this.generatedPrompts.length) {
      this.selectedPromptIndex = newIndex;
    }
  }

  selectPrompt(index: number): void {
    this.selectedPromptIndex = index;
  }

  applySelectedPrompt(): void {
    //if (this.selectedPromptIndex >= 0 && this.selectedPromptIndex < this.generatedPrompts.length) {
      const selectedPrompt = this.generatedPrompts[this.selectedPromptIndex];
      this.closeModal({
        prompt: this.generatedPrompts.length >=0
          ? this.generatedPrompts
          : selectedPrompt
      });
    //}
  }

  closeModal(result?: any): void {
    this.activeModal.close(result);
  }

  /**
   * Copy prompt text to clipboard
   */
  copyToClipboard(event: Event, text: string): void {
    // Stop event propagation to prevent selecting the item
    event.stopPropagation();

    // Copy text to clipboard using the Clipboard API
    navigator.clipboard.writeText(text)
      .then(() => {
        // Show a temporary success message
        const target = event.currentTarget as HTMLElement;

        // Store original HTML
        const originalHTML = target.innerHTML;

        // Change icon temporarily
        target.innerHTML = '<i class="fas fa-check"></i>';
        target.classList.add('text-success');

        // Restore original after a delay
        setTimeout(() => {
          target.innerHTML = originalHTML;
          target.classList.remove('text-success');
        }, 1500);
      })
      .catch(err => {
        console.error('Could not copy text: ', err);

        // Show error message
        const target = event.currentTarget as HTMLElement;
        target.innerHTML = '<i class="fas fa-times"></i>';
        target.classList.add('text-danger');

        // Restore original after a delay
        setTimeout(() => {
          target.innerHTML = '<i class="fas fa-copy"></i>';
          target.classList.remove('text-danger');
        }, 1500);
      });
  }

  // New methods for gallery functionality
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.isUploading = true;
      this.uploadError = null;

      // Handle file upload here
      // For now, we'll just create a local URL for preview
      Array.from(input.files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.uploadedImages.push({
            url: e.target?.result as string,
            name: file.name
          });
          this.isUploading = false;
        };
        reader.readAsDataURL(file);
      });
    }
  }

  removeImage(index: number): void {
    this.uploadedImages.splice(index, 1);
  }

  nextImage(): void {
    if (this.currentImageIndex < this.uploadedImages.length - 1) {
      this.currentImageIndex++;
    }
  }

  previousImage(): void {
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
    }
  }

  previewImage(imageUrl: string): void {
    this.previewImageUrl = imageUrl;
  }

  closePreview(): void {
    this.previewImageUrl = null;
  }

  downloadImage(imageUrl: string, filename: string = ''): void {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = filename || `image-${this.currentImageIndex + 1}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  deleteImage(index: number): void {
    if (confirm('هل أنت متأكد من حذف هذه الصورة؟')) {
      this.uploadedImages.splice(index, 1);
      if (this.currentImageIndex >= this.uploadedImages.length) {
        this.currentImageIndex = Math.max(0, this.uploadedImages.length - 1);
      }
    }
  }

  handleImageError(event: any): void {
    event.target.src = 'assets/images/placeholder.jpg'; // Add a placeholder image
  }

  triggerFileInput(): void {
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  /**
   * Save all uploaded images
   */
  saveAllImages(): void {
    if (this.uploadedImages.length === 0) {
      return;
    }

    // Create a zip file containing all images if there are multiple images
    if (this.uploadedImages.length > 1) {
      // Use JSZip library or similar for zipping multiple files
      // For now, we'll just download them individually

      // Create a notification/alert for user
      alert(`سيتم تنزيل ${this.uploadedImages.length} صور.`);

      // Download each image with a small delay to avoid browser throttling
      this.uploadedImages.forEach((image, index) => {
        setTimeout(() => {
          this.downloadImage(image.url, `image-${index + 1}`);
        }, index * 500); // 500ms delay between downloads
      });
    } else {
      // Just download the single image
      this.downloadImage(this.uploadedImages[0].url, 'image-1');
    }

    // Here you would typically also save references to these images in your backend
    // this.tamemService.saveUploadedImages(this.uploadedImages).subscribe({
    //   next: (response) => {
    //     console.log('Images saved successfully', response);
    //   },
    //   error: (error) => {
    //     console.error('Error saving images:', error);
    //   }
    // });
  }


  loadImagePrompts(): void {
    this.isGenerating = true;
    this.errorMessage = null;
    this.frameData.sceneImagePrompt = '' ; 
    const content = this.frameData.sceneImagePrompt;
    const style = 'whiteboard animation';
    const layout = this.frameData.sceneLayoutType;
    // Call service to generate prompts
    this.isGenerating = false;

    //  this.generatedPrompts = response.prompts;

    // Get the current text from the textarea


    if (Array.isArray(this.frameData.imagePrompt)) {
      // Loop through the array
      for (const prompt of this.frameData.imagePrompt) {
     
        
        var textareaContent = prompt;

        // Check if the textarea has content
        if (!textareaContent || textareaContent.trim() === '') {
          console.error('Please enter some content in the textarea');
          return;
        }
    
        // Replace the hardcoded text with the textarea content
        var retPrompts = [
          textareaContent
        ];
    
        // Initialize this.generatedPrompts if it doesn't exist yet
        if (!this.generatedPrompts) {
          this.generatedPrompts = [];
        }
    
        // Append the new prompt to existing prompts
        this.generatedPrompts = [
          ...this.generatedPrompts,
          ...retPrompts
        ];

        

      }
    } 


   


    this.selectedPromptIndex = 0; // Select first by default

    // Switch to prompts tab after generation
    this.setActiveTab('prompts');



  }


  resetAllPrompts(){
    
    this.generatedPrompts = [];
    this.applySelectedPrompt() ; 

  }
}