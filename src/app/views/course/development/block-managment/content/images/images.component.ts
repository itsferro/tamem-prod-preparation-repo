
import { ChangeDetectorRef, Component, OnInit, inject, ViewChild, ElementRef, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TamemService } from '@/app/core/service/tamem-service.service';
 

// Interfaces
interface BlockInfo {
  id: number;
  title: string;
  lessonName: string;
  courseName: string;
  description: string;
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  content: string;
  lastUpdated: string;
}
 
 
interface UploadedImage {
  id: string;
  name: string;
  size: number;
  type: string;
  preview: string;
  file: File;
}

// New interface for saved images from backend
interface SavedImage {
  id: number;
  name: string;
  url: string;
  size: number;
  formatted_size: string;
  type: string;
  file_type: string;
  metadata?: any;
  uploaded_at: string;
}

@Component({
  selector: 'block-managment-content-images',
  standalone: true,
  imports: [CommonModule, FormsModule ],
  templateUrl: './images.component.html',
  styleUrl: './images.component.scss'
})
export class BlockManagmentContentImagesComponent implements OnInit {

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  private tamemService = inject(TamemService);
  private cdr = inject(ChangeDetectorRef);
  private route = inject(ActivatedRoute);
  @Input() blockId: number = 0;

 

  // Image Upload State
  uploadedImages: UploadedImage[] = []; // For new uploads
  savedImages: SavedImage[] = []; // For images already saved to backend
  isDragOver: boolean = false;
  isSaving: boolean = false;
  isLoadingImages: boolean = false;
  selectedImageForView: UploadedImage | SavedImage | null = null;
  maxFileSize: number = 5 * 1024 * 1024; // 5MB
  maxFiles: number = 10;
  allowedTypes: string[] = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

  // Image navigation in modal
  currentImageIndex: number = -1;
  allImages: (UploadedImage | SavedImage)[] = [];

  // Animation states
  isHeroAnimated: boolean = false;
  currentBlock: any;
 
 

  ngOnInit(): void {
 
    this.loadSavedImages();
    
 
  }
 
  // Image Upload Methods
  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  onFilesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.handleFiles(Array.from(input.files));
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = false;
    
    if (event.dataTransfer?.files) {
      this.handleFiles(Array.from(event.dataTransfer.files));
    }
  }

  private handleFiles(files: File[]): void {
    const validFiles = files.filter(file => this.validateFile(file));
    
    if (this.uploadedImages.length + validFiles.length > this.maxFiles) {
      this.showNotification(`Maximum ${this.maxFiles} images allowed`, 'warning');
      return;
    }

    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const image: UploadedImage = {
          id: this.generateImageId(),
          name: file.name,
          size: file.size,
          type: file.type,
          preview: e.target?.result as string,
          file: file
        };
        this.uploadedImages.push(image);
        this.cdr.detectChanges();
      };
      reader.readAsDataURL(file);
    });
  }

  private validateFile(file: File): boolean {
    if (!this.allowedTypes.includes(file.type)) {
      this.showNotification(`Invalid file type: ${file.name}`, 'error');
      return false;
    }

    if (file.size > this.maxFileSize) {
      this.showNotification(`File too large: ${file.name}`, 'error');
      return false;
    }

    return true;
  }

  private generateImageId(): string {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }

  removeImage(imageId: string): void {
    this.uploadedImages = this.uploadedImages.filter(img => img.id !== imageId);
    this.showNotification('Image removed', 'info');
  }

  // Remove saved image
  removeSavedImage(imageId: number): void {
    if (confirm('Are you sure you want to delete this image?')) {
      this.tamemService.deleteAttachment(imageId.toString()).subscribe({
        next: (response) => {
          this.savedImages = this.savedImages.filter(img => img.id !== imageId);
          this.showNotification('Image deleted successfully', 'success');
        },
        error: (error) => {
          console.error('Error deleting image:', error);
          this.showNotification('Failed to delete image', 'error');
        }
      });
    }
  }

  viewImage(image: UploadedImage | SavedImage): void {
    // Combine all images for navigation
    this.allImages = [...this.uploadedImages, ...this.savedImages];
    
    // Find current image index
    this.currentImageIndex = this.allImages.findIndex(img => {
      if (this.isSavedImage(image) && this.isSavedImage(img)) {
        return img.id === image.id;
      } else if (!this.isSavedImage(image) && !this.isSavedImage(img)) {
        return img.id === image.id;
      }
      return false;
    });
    
    this.selectedImageForView = image;
  }

  closeImageModal(): void {
    this.selectedImageForView = null;
    this.currentImageIndex = -1;
    this.allImages = [];
  }

  // Navigate to next image in modal
  nextImage(): void {
    if (this.currentImageIndex < this.allImages.length - 1) {
      this.currentImageIndex++;
      this.selectedImageForView = this.allImages[this.currentImageIndex];
    }
  }

  // Navigate to previous image in modal
  previousImage(): void {
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
      this.selectedImageForView = this.allImages[this.currentImageIndex];
    }
  }

  // Check if there's a next image
  hasNextImage(): boolean {
    return this.currentImageIndex < this.allImages.length - 1;
  }

  // Check if there's a previous image
  hasPreviousImage(): boolean {
    return this.currentImageIndex > 0;
  }

  // Get current image position info
  getCurrentImagePosition(): string {
    if (this.allImages.length === 0) return '';
    return `${this.currentImageIndex + 1} of ${this.allImages.length}`;
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  // Drag and Drop Reordering Methods - REMOVED
  // Keeping only manual reordering methods

  // Manual reordering methods
  moveImageUp(index: number): void {
    if (index > 0) {
      this.reorderImages(index, index - 1);
      this.showNotification('Image moved up', 'info');
    }
  }

  moveImageDown(index: number): void {
    if (index < this.uploadedImages.length - 1) {
      this.reorderImages(index, index + 1);
      this.showNotification('Image moved down', 'info');
    }
  }

  private reorderImages(fromIndex: number, toIndex: number): void {
    const draggedImage = this.uploadedImages[fromIndex];
    
    // Create a new array to trigger change detection
    const newImages = [...this.uploadedImages];
    
    // Remove from old position
    newImages.splice(fromIndex, 1);
    
    // Insert at new position
    newImages.splice(toIndex, 0, draggedImage);
    
    // Update the array
    this.uploadedImages = newImages;
    
    console.log('Reordered images:', this.uploadedImages.map((img, i) => `${i + 1}: ${img.name}`));
  }

  // Reset image order to original upload order
  resetImageOrder(): void {
    if (confirm('Reset all images to their original upload order?')) {
      // Sort by the timestamp in the ID (which contains Date.now())
      this.uploadedImages.sort((a, b) => {
        const timeA = parseInt(a.id.substring(0, 13));
        const timeB = parseInt(b.id.substring(0, 13));
        return timeA - timeB;
      });
      this.showNotification('Image order reset to original upload order', 'info');
    }
  }

  // Updated saveImages method to work with new API
  saveImages(): void {
    if (this.uploadedImages.length === 0) {
      this.showNotification('No images to save', 'warning');
      return;
    }

    this.isSaving = true;
    
    // Extract files from uploadedImages in the current order
    const files = this.uploadedImages.map(image => image.file);
    
    console.log('Saving images in order:', this.uploadedImages.map((img, i) => `${i + 1}: ${img.name}`));

    // Call the updated service method
    this.tamemService.saveBlockImages(this.blockId, files).subscribe({
      next: (response) => {
        if (response.status === 'complete') {
          console.log('Images saved successfully:', response.data);
          this.showNotification('Images saved successfully in the specified order!', 'success');
          this.isSaving = false;
          
          // Clear uploaded images after successful save
          this.uploadedImages = [];
          
          // Reload saved images to show the new ones
          this.loadSavedImages();
        } else if (response.status === 'progress') {
          // You can show progress if needed
          console.log('Upload progress:', response.progress + '%');
        }
      },
      error: (error) => {
        console.error('Error saving images:', error);
        this.showNotification('Failed to save images', 'error');
        this.isSaving = false;
      }
    });
  }

  // Load saved images from backend
  loadSavedImages(): void {
    this.isLoadingImages = true;
    
    this.tamemService.getBlockImages(this.blockId).subscribe({
      next: (response) => {
        this.savedImages = response.data || [];
        console.log('Loaded saved images:', this.savedImages);
        this.isLoadingImages = false;
      },
      error: (error) => {
        console.error('Error loading saved images:', error);
        this.isLoadingImages = false;
      }
    });
  }

  // Check if image is from saved images
  isSavedImage(image: UploadedImage | SavedImage): image is SavedImage {
    return 'id' in image && typeof image.id === 'number';
  }

  // Get image URL for display
  getImageUrl(image: UploadedImage | SavedImage): string {
    if (this.isSavedImage(image)) {
      return image.url;
    } else {
      return image.preview;
    }
  }

  // Get image size display
  getImageSize(image: UploadedImage | SavedImage): string {
    if (this.isSavedImage(image)) {
      return image.formatted_size;
    } else {
      return this.formatFileSize(image.size);
    }
  }

     // Utility Methods
  private showNotification(message: string, type: 'success' | 'info' | 'warning' | 'error'): void {
    console.log(`[${type.toUpperCase()}] ${message}`);

    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(message);
    }
  }

    // Keyboard Navigation Support
    onKeyDown(event: KeyboardEvent): void {
      switch (event.key) {
        case 'Escape':
          if (this.selectedImageForView) {
            this.closeImageModal();
            event.preventDefault();
          }
          break;
        case 'ArrowLeft':
          if (this.selectedImageForView) {
            this.previousImage();
            event.preventDefault();
          }
          break;
        case 'ArrowRight':
          if (this.selectedImageForView) {
            this.nextImage();
            event.preventDefault();
          }
          break;
      }
    }



      // Date Formatting
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    }
  }
  

  trackByImageId(index: number, image: UploadedImage): string {
    return image.id;
  }


  // Lifecycle cleanup
  ngOnDestroy(): void {
    console.log('Key Insights component destroyed');
  }
}