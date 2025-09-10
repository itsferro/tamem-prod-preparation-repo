import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TamemService } from '@/app/core/service/tamem-service.service';

interface ImageFile {
  id: string;
  file: File;
  preview: string;
  base64: string;
  mimeType: string;
  size: string;
  name: string;
}

interface ApiResponse {
  success: boolean;
  data?: any;
  error?: string;
  timestamp: Date;
}

@Component({
  selector: 'block-managment-ai-api-images',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ai-api-images.component.html',
  styleUrl: './ai-api-images.component.scss'
})
export class BlockManagmentAiApiImagesComponent {
  // Images management
  selectedImages: ImageFile[] = [];
  isDragOver: boolean = false;
  maxImages: number = 10;
  maxFileSize: number = 20 * 1024 * 1024; // 20MB

  // AI Request settings
  prompt: string = '';
  selectedModel: string = 'anthropic/claude-3-5-sonnet-20241022';
  maxTokens: number = 1000;
  temperature: number = 0.7;

  // Response data
  response: ApiResponse | null = null;
  isLoading: boolean = false;

  // Available models that support vision
  visionModels = [
    { value: 'anthropic/claude-3-5-sonnet-20241022', label: 'Claude 3.5 Sonnet (Best Vision)', provider: 'Anthropic' },
    { value: 'anthropic/claude-3-opus-20240229', label: 'Claude 3 Opus (Advanced)', provider: 'Anthropic' },
    { value: 'anthropic/claude-3-haiku-20240307', label: 'Claude 3 Haiku (Fast)', provider: 'Anthropic' },
    { value: 'openai/gpt-4o', label: 'GPT-4o (Vision)', provider: 'OpenAI' },
    { value: 'openai/gpt-4o-mini', label: 'GPT-4o Mini (Vision)', provider: 'OpenAI' },
    { value: 'google/gemini-pro-vision', label: 'Gemini Pro Vision', provider: 'Google' }
  ];

  // Grouped models for template dropdown
  groupedVisionModels: { [key: string]: Array<{value: string, label: string, provider: string}> } = {
    'Anthropic': this.visionModels.filter(m => m.provider === 'Anthropic'),
    'OpenAI': this.visionModels.filter(m => m.provider === 'OpenAI'),
    'Google': this.visionModels.filter(m => m.provider === 'Google')
  };

  // Provider keys for template iteration
  visionProviderKeys = ['Anthropic', 'OpenAI', 'Google'];

  // Quick prompt templates
  promptTemplates = [
    { name: 'Analyze Images', prompt: 'Please analyze these images and describe what you see in detail.' },
    { name: 'Compare Images', prompt: 'Compare these images and highlight the differences and similarities.' },
    { name: 'Extract Text', prompt: 'Extract and transcribe all text visible in these images.' },
    { name: 'Math Problems', prompt: 'Solve any math problems or equations shown in these images step by step.' },
    { name: 'Summarize Content', prompt: 'Summarize the key information and concepts shown in these images.' },
    { name: 'Identify Objects', prompt: 'Identify and list all objects, people, and elements visible in these images.' },
    { name: 'Technical Analysis', prompt: 'Provide a technical analysis of these images including any diagrams, charts, or technical content.' }
  ];

  constructor(private tamemService: TamemService) {}

  /**
   * Handle file selection from input
   */
  onFileSelect(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files) {
      this.processFiles(Array.from(target.files));
    }
    // Reset input
    target.value = '';
  }

  /**
   * Handle drag and drop
   */
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
      this.processFiles(Array.from(event.dataTransfer.files));
    }
  }

  /**
   * Process uploaded files
   */
  private async processFiles(files: File[]): Promise<void> {
    // Filter valid image files
    const validFiles = files.filter(file => {
      const isImage = file.type.startsWith('image/');
      const isValidSize = file.size <= this.maxFileSize;
      
      if (!isImage) {
        alert(`${file.name} is not a valid image file`);
        return false;
      }
      
      if (!isValidSize) {
        alert(`${file.name} is too large. Maximum size is 20MB`);
        return false;
      }
      
      return true;
    });

    // Check total image limit
    if (this.selectedImages.length + validFiles.length > this.maxImages) {
      alert(`Maximum ${this.maxImages} images allowed`);
      return;
    }

    // Process each file
    for (const file of validFiles) {
      try {
        const imageFile = await this.createImageFile(file);
        this.selectedImages.push(imageFile);
      } catch (error) {
        console.error('Error processing file:', file.name, error);
        alert(`Error processing ${file.name}`);
      }
    }
  }

  /**
   * Create ImageFile object with preview and base64
   */
  private async createImageFile(file: File): Promise<ImageFile> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = () => {
        const base64String = reader.result as string;
        const base64Data = base64String.split(',')[1]; // Remove data:image/jpeg;base64, prefix
        
        resolve({
          id: Date.now().toString() + Math.random(),
          file: file,
          preview: base64String,
          base64: base64Data,
          mimeType: file.type,
          size: this.formatFileSize(file.size),
          name: file.name
        });
      };
      
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  }

  /**
   * Format file size for display
   */
  private formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  }

  /**
   * Remove image from selection
   */
  removeImage(imageId: string): void {
    this.selectedImages = this.selectedImages.filter(img => img.id !== imageId);
  }

  /**
   * Clear all images
   */
  clearAllImages(): void {
    this.selectedImages = [];
  }

  /**
   * Load prompt template
   */
  loadPromptTemplate(template: any): void {
    this.prompt = template.prompt;
  }

  /**
   * Send images to AI
   */
  async sendToAi(): Promise<void> {
    if (this.selectedImages.length === 0) {
      alert('Please select at least one image');
      return;
    }

    if (!this.prompt.trim()) {
      alert('Please enter a prompt');
      return;
    }

    this.isLoading = true;
    this.response = null;

    try {
      // Build content array with text and images
      const content: any[] = [
        {
          type: 'text',
          text: this.prompt.trim()
        }
      ];

      // Add all images to content
      this.selectedImages.forEach((image, index) => {
        console.log(`Adding image ${index + 1}:`, {
          name: image.name,
          mimeType: image.mimeType,
          base64Length: image.base64.length
        });

        // ✅ Try both formats - OpenRouter might prefer image_url
        const imageContent = {
          type: 'image_url',
          image_url: {
            url: `data:${image.mimeType};base64,${image.base64}`
          }
        };

        content.push(imageContent);
      });

      // Build AI request
      const aiRequest = {
        model: this.selectedModel,
        messages: [
          {
            role: 'user',
            content: content
          }
        ],
        max_tokens: this.maxTokens,
        temperature: this.temperature
      };

      // Debug: Log the request structure (without full base64 to avoid console spam)
      console.log('Sending AI request:', {
        model: aiRequest.model,
        messageCount: aiRequest.messages.length,
        contentItems: aiRequest.messages[0].content.length,
        contentTypes: aiRequest.messages[0].content.map((c: any) => c.type)
      });

      // Send to AI
      const backendResponse = await this.tamemService.sendAiApiRequest(aiRequest).toPromise();

      console.log('Received AI response:', backendResponse);

      this.response = {
        success: true,
        data: backendResponse,
        timestamp: new Date()
      };

    } catch (error: any) {
      console.error('AI request failed:', error);
      
      let errorMessage = 'Unknown error occurred';
      
      if (error?.error && error?.message) {
        errorMessage = error.message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      this.response = {
        success: false,
        error: errorMessage,
        timestamp: new Date()
      };
    } finally {
      this.isLoading = false;
    }
  }

  /**
   * Extract simple response content
   */
  getResponseContent(): string {
    if (!this.response?.success || !this.response.data) {
      return '';
    }

    try {
      // Handle different response structures
      if (this.response.data?.data?.choices && this.response.data.data.choices.length > 0) {
        const choice = this.response.data.data.choices[0];
        return choice.message?.content || choice.text || '';
      }

      if (this.response.data?.choices && this.response.data.choices.length > 0) {
        const choice = this.response.data.choices[0];
        return choice.message?.content || choice.text || '';
      }

      return 'No content found in response';
    } catch (error) {
      return 'Error extracting content from response';
    }
  }

  /**
   * Copy response to clipboard
   */
  async copyResponse(): Promise<void> {
    const content = this.getResponseContent();
    if (content) {
      try {
        await navigator.clipboard.writeText(content);
        alert('Response copied to clipboard!');
      } catch (error) {
        console.error('Failed to copy to clipboard:', error);
      }
    }
  }

  /**
   * Get formatted JSON response
   */
  getFormattedResponse(): string {
    if (!this.response?.data) return '';
    try {
      return JSON.stringify(this.response.data, null, 2);
    } catch {
      return String(this.response.data);
    }
  }
}