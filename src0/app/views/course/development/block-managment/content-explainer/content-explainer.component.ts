import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TamemService } from '@/app/core/service/tamem-service.service';
// Import your TamemService here
// import { TamemService } from 'path/to/your/tamem.service';

@Component({
  selector: 'block-managment-content-explainer',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './content-explainer.component.html',
  styleUrl: './content-explainer.component.scss'
})
export class BlockManagmentContentExplainerComponent {
  @Input() blockId: number = 0;
  
  storyboardContent: string = '';
  isLoading: boolean = false;
  error: string = '';

  private tamemService = inject(TamemService); // Inject your service
  
  constructor(private http: HttpClient) {}

  generateContent(): void {
    if (!this.blockId || this.blockId <= 0) {
      this.error = 'Valid Block ID is required to generate storyboard';
      return;
    }

    this.isLoading = true;
    this.error = '';
    this.storyboardContent = '';

    console.log('Starting storyboard generation for blockId:', this.blockId);

    // Use tamemService to generate storyboard based on block images
    this.tamemService.generateContentFromBlockImages(this.blockId).subscribe({
      next: (response) => {
        console.log('Full API Response:', response);
        
        // Handle different possible response structures
        let content = '';
        
        if (response.storyboard) {
          content = response.storyboard;
        } else if (response.data && response.data.storyboard) {
          content = response.data.storyboard;
        } else if (response.content) {
          content = response.content;
        } else if (typeof response === 'string') {
          content = response;
        } else {
          console.warn('Unexpected response structure:', response);
          content = response.content_explanation;
        }
        
        console.log('Extracted content:', content);
        
        this.storyboardContent = content;
        this.isLoading = false;
        this.showNotification('Storyboard generated successfully!', 'success');
        
        console.log('Component state updated - isLoading:', this.isLoading, 'content length:', content.length);
      },
      error: (error) => {
        console.error('Error generating storyboard:', error);
        this.error = error.message || 'Failed to generate storyboard. Please try again.';
        this.isLoading = false;
        this.showNotification(this.error, 'error');
        
        console.log('Error state - isLoading:', this.isLoading, 'error:', this.error);
      }
    });
  }

  private showNotification(message: string, type: 'success' | 'error'): void {
    // Implement your notification logic here
    console.log(`NOTIFICATION ${type.toUpperCase()}: ${message}`);
    
    // Example: You might want to show this in the UI temporarily
    if (type === 'success') {
      // Handle success notification
      console.log('✅ Success notification:', message);
    } else {
      // Handle error notification  
      console.log('❌ Error notification:', message);
    }
    
    // TODO: Replace with your actual notification system
    // For now, you can use a simple alert for testing
    // alert(`${type.toUpperCase()}: ${message}`);
  }

  clearContent(): void {
    this.storyboardContent = '';
    this.error = '';
  }
}