import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TamemService } from '@/app/core/service/tamem-service.service';
import { BlockManagmentAiApiImagesComponent } from './ai-api-images/ai-api-images.component';

interface ApiResponse {
  success: boolean;
  data?: any;
  error?: string;
  timestamp: Date;
}

@Component({
  selector: 'block-managment-ai-api-manager',
  standalone: true,
  imports: [CommonModule, FormsModule , BlockManagmentAiApiImagesComponent],
  templateUrl: './ai-api-manager.component.html',
  styleUrl: './ai-api-manager.component.scss'
})
export class BlockManagmentAiApiManagerComponent {
  // Code editor content
  apiCode: string = `{
  "model": "gpt-3.5-turbo",
  "messages": [
    {
      "role": "user",
      "content": "Hello, how are you?"
    }
  ],
  "temperature": 0.7,
  "max_tokens": 150
}`;

  // Response data
  response: ApiResponse | null = null;
  isLoading: boolean = false;
  
  // Request history
  requestHistory: Array<{
    request: string;
    response: ApiResponse;
    timestamp: Date;
  }> = [];

  // Static templates for different AI providers
  private staticTemplates = {
    openai_chat: {
      name: 'OpenAI Chat Completion',
      description: 'Standard ChatGPT API request',
      request: `{
  "model": "gpt-3.5-turbo",
  "messages": [
    {
      "role": "system",
      "content": "You are a helpful assistant."
    },
    {
      "role": "user",
      "content": "Explain quantum computing in simple terms"
    }
  ],
  "temperature": 0.7,
  "max_tokens": 200
}`
    },
    openai_completion: {
      name: 'OpenAI Text Completion',
      description: 'Legacy completion API',
      request: `{
  "model": "text-davinci-003",
  "prompt": "Write a short poem about artificial intelligence",
  "temperature": 0.8,
  "max_tokens": 150,
  "top_p": 1,
  "frequency_penalty": 0,
  "presence_penalty": 0
}`
    },
    claude: {
      name: 'Anthropic Claude',
      description: 'Claude API request format',
      request: `{
  "model": "claude-3-sonnet-20240229",
  "max_tokens": 200,
  "messages": [
    {
      "role": "user",
      "content": "What are the benefits of renewable energy?"
    }
  ],
  "temperature": 0.7
}`
    },
    gemini: {
      name: 'Google Gemini',
      description: 'Gemini Pro API request',
      request: `{
  "model": "gemini-pro",
  "prompt": "Write a short story about space exploration",
  "temperature": 0.8,
  "maxOutputTokens": 200,
  "topP": 0.95,
  "topK": 40
}`
    },
    custom_function_calling: {
      name: 'OpenAI Function Calling',
      description: 'Function calling example',
      request: `{
  "model": "gpt-3.5-turbo",
  "messages": [
    {
      "role": "user",
      "content": "What's the weather like in San Francisco?"
    }
  ],
  "functions": [
    {
      "name": "get_current_weather",
      "description": "Get the current weather in a given location",
      "parameters": {
        "type": "object",
        "properties": {
          "location": {
            "type": "string",
            "description": "The city and state, e.g. San Francisco, CA"
          },
          "unit": {
            "type": "string",
            "enum": ["celsius", "fahrenheit"]
          }
        },
        "required": ["location"]
      }
    }
  ],
  "function_call": "auto"
}`
    },
    image_generation: {
      name: 'DALL-E Image Generation',
      description: 'Generate images with DALL-E',
      request: `{
  "model": "dall-e-3",
  "prompt": "A futuristic city with flying cars and neon lights",
  "n": 1,
  "size": "1024x1024",
  "quality": "standard",
  "style": "vivid"
}`
    }
  };

  // Saved custom templates (stored locally)
  customTemplates: Array<{
    id: string;
    name: string;
    description: string;
    request: string;
    created: Date;
  }> = [];

  // Current selected template type
  selectedTemplateType: string = '';

  // Simple mode variables
  simpleMode: boolean = true;
  simpleInput: string = '';
  simpleOutput: string = '';
  selectedModel: string = 'openai/gpt-3.5-turbo';
  temperature: number = 0.7;
  maxTokens: number = 200;

  // Available models for simple mode
  availableModels = [
    { value: 'openai/gpt-3.5-turbo', label: 'GPT-3.5 Turbo (Fast & Cheap)', provider: 'OpenAI' },
    { value: 'openai/gpt-4o', label: 'GPT-4o (Most Capable)', provider: 'OpenAI' },
    { value: 'openai/gpt-4o-mini', label: 'GPT-4o Mini (Balanced)', provider: 'OpenAI' },
    { value: 'anthropic/claude-3.5-sonnet', label: 'Claude 3.5 Sonnet (Creative)', provider: 'Anthropic' },
    { value: 'anthropic/claude-3-haiku', label: 'Claude 3 Haiku (Fast)', provider: 'Anthropic' },
    { value: 'anthropic/claude-3-opus', label: 'Claude 3 Opus (Advanced)', provider: 'Anthropic' },
    { value: 'google/gemini-pro-1.5', label: 'Gemini Pro 1.5 (Long Context)', provider: 'Google' },
    { value: 'meta-llama/llama-2-70b-chat', label: 'Llama 2 70B (Open Source)', provider: 'Meta' }
  ];

  // Grouped models for template dropdown
  groupedModels: { [key: string]: Array<{value: string, label: string, provider: string}> } = {
    'OpenAI': this.availableModels.filter(m => m.provider === 'OpenAI'),
    'Anthropic': this.availableModels.filter(m => m.provider === 'Anthropic'),
    'Google': this.availableModels.filter(m => m.provider === 'Google'),
    'Meta': this.availableModels.filter(m => m.provider === 'Meta')
  };

  // Provider keys for template iteration
  providerKeys = ['OpenAI', 'Anthropic', 'Google', 'Meta'];

  constructor(private tamemService: TamemService) {
    this.loadCustomTemplates();
  }

  /**
   * Send the API code to backend
   */
  async sendToAiApi(): Promise<void> {
    // Determine which mode we're in and prepare the request
    let apiRequestData: any;
    let inputContent: string;

    if (this.simpleMode) {
      if (!this.simpleInput.trim()) {
        this.response = {
          success: false,
          error: 'Please enter some text in the input field',
          timestamp: new Date()
        };
        return;
      }

      // Build request from simple inputs
      apiRequestData = {
        model: this.selectedModel,
        messages: [
          {
            role: 'user',
            content: this.simpleInput.trim()
          }
        ],
        max_tokens: this.maxTokens,
        temperature: this.temperature
      };
      inputContent = this.simpleInput;

      // Update the technical JSON view
      this.apiCode = JSON.stringify(apiRequestData, null, 2);
    } else {
      // Advanced mode - use the JSON code
      if (!this.apiCode.trim()) {
        this.response = {
          success: false,
          error: 'API code cannot be empty',
          timestamp: new Date()
        };
        return;
      }

      try {
        apiRequestData = JSON.parse(this.apiCode);
        inputContent = this.apiCode;
      } catch (error) {
        this.response = {
          success: false,
          error: 'Invalid JSON format: ' + (error as Error).message,
          timestamp: new Date()
        };
        return;
      }
    }

    this.isLoading = true;
    this.response = null;
    this.simpleOutput = '';

    try {
      // Send to your backend endpoint using TamemService
      const backendResponse = await this.tamemService.sendAiApiRequest(apiRequestData).toPromise();

      this.response = {
        success: true,
        data: backendResponse,
        timestamp: new Date()
      };

      // Extract simple content for simple mode
      if (this.simpleMode) {
        this.simpleOutput = this.extractSimpleContent(backendResponse);
      }

      // Add to history
      this.addToHistory(inputContent, this.response);

    } catch (error: any) {
      let errorMessage = 'Unknown error occurred';
      
      if (error instanceof SyntaxError) {
        errorMessage = 'Invalid JSON format: ' + error.message;
      } else if (error?.error && error?.message) {
        // Handle formatted error from TamemService
        errorMessage = error.message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      this.response = {
        success: false,
        error: errorMessage,
        timestamp: new Date()
      };

      this.addToHistory(inputContent, this.response);
    } finally {
      this.isLoading = false;
    }
  }

  /**
   * Extract simple content from API response
   */
  private extractSimpleContent(response: any): string {
    try {
      // Handle different response structures
      if (response?.data?.choices && response.data.choices.length > 0) {
        const choice = response.data.choices[0];
        if (choice.message?.content) {
          return choice.message.content;
        }
        if (choice.text) {
          return choice.text;
        }
      }

      // Direct response structure
      if (response?.choices && response.choices.length > 0) {
        const choice = response.choices[0];
        if (choice.message?.content) {
          return choice.message.content;
        }
        if (choice.text) {
          return choice.text;
        }
      }

      return 'No content found in response';
    } catch (error) {
      return 'Error extracting content from response';
    }
  }

  /**
   * Toggle between simple and advanced mode
   */
  toggleMode(): void {
    this.simpleMode = !this.simpleMode;
    
    // When switching to simple mode, try to extract info from JSON
    if (this.simpleMode && this.apiCode) {
      try {
        const parsed = JSON.parse(this.apiCode);
        if (parsed.model) this.selectedModel = parsed.model;
        if (parsed.temperature) this.temperature = parsed.temperature;
        if (parsed.max_tokens) this.maxTokens = parsed.max_tokens;
        if (parsed.messages && parsed.messages.length > 0) {
          const userMessage = parsed.messages.find((m: any) => m.role === 'user');
          if (userMessage?.content) this.simpleInput = userMessage.content;
        }
      } catch (error) {
        // Ignore parsing errors when switching modes
      }
    }

    // When switching to advanced mode, update JSON from simple inputs
    if (!this.simpleMode && this.simpleInput) {
      this.updateJsonFromSimpleInputs();
    }
  }

  /**
   * Update JSON code from simple inputs
   */
  private updateJsonFromSimpleInputs(): void {
    if (this.simpleInput.trim()) {
      const apiRequest = {
        model: this.selectedModel,
        messages: [
          {
            role: 'user',
            content: this.simpleInput.trim()
          }
        ],
        max_tokens: this.maxTokens,
        temperature: this.temperature
      };
      this.apiCode = JSON.stringify(apiRequest, null, 2);
    }
  }

  /**
   * Clear simple inputs
   */
  clearSimpleInputs(): void {
    this.simpleInput = '';
    this.simpleOutput = '';
  }

  /**
   * Copy simple output to clipboard
   */
  async copySimpleOutput(): Promise<void> {
    if (this.simpleOutput) {
      await this.copyToClipboard(this.simpleOutput);
    }
  }

  /**
   * Add request/response to history
   */
  private addToHistory(request: string, response: ApiResponse): void {
    this.requestHistory.unshift({
      request,
      response,
      timestamp: new Date()
    });

    // Keep only last 10 requests
    if (this.requestHistory.length > 10) {
      this.requestHistory = this.requestHistory.slice(0, 10);
    }
  }

  /**
   * Clear the code editor
   */
  clearCode(): void {
    this.apiCode = '';
  }

  /**
   * Clear the response
   */
  clearResponse(): void {
    this.response = null;
  }

  /**
   * Clear request history
   */
  clearHistory(): void {
    this.requestHistory = [];
  }

  /**
   * Load a request from history
   */
  loadFromHistory(historyItem: any): void {
    this.apiCode = historyItem.request;
  }

  /**
   * Format JSON string for display
   */
  formatJson(obj: any): string {
    try {
      return JSON.stringify(obj, null, 2);
    } catch {
      return String(obj);
    }
  }

  /**
   * Copy text to clipboard
   */
  async copyToClipboard(text: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(text);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  }

  /**
   * Load sample API request
   */
  loadSample(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const type = target.value;
    
    if (!type) return;
    
    const template = this.staticTemplates[type as keyof typeof this.staticTemplates];
    if (template) {
      this.apiCode = template.request;
      this.selectedTemplateType = type;
    }
    
    // Reset the select value
    target.value = '';
  }

  /**
   * Get all available templates (static + custom)
   */
  getAllTemplates() {
    return Object.entries(this.staticTemplates).map(([key, value]) => ({
      id: key,
      ...value,
      isStatic: true
    }));
  }

  /**
   * Save current request as custom template
   */
  saveAsTemplate(): void {
    if (!this.apiCode.trim()) {
      alert('Cannot save empty template');
      return;
    }

    const name = prompt('Enter template name:');
    if (!name) return;

    const description = prompt('Enter template description (optional):') || '';

    try {
      // Validate JSON
      JSON.parse(this.apiCode);

      const template = {
        id: Date.now().toString(),
        name: name.trim(),
        description: description.trim(),
        request: this.apiCode,
        created: new Date()
      };

      this.customTemplates.push(template);
      this.saveCustomTemplates();
      
      alert('Template saved successfully!');
    } catch (error) {
      alert('Invalid JSON format. Please fix the syntax before saving.');
    }
  }

  /**
   * Load custom template
   */
  loadCustomTemplate(template: any): void {
    this.apiCode = template.request;
    this.selectedTemplateType = template.id;
  }

  /**
   * Delete custom template
   */
  deleteCustomTemplate(templateId: string): void {
    if (confirm('Are you sure you want to delete this template?')) {
      this.customTemplates = this.customTemplates.filter(t => t.id !== templateId);
      this.saveCustomTemplates();
    }
  }

  /**
   * Save custom templates to localStorage
   */
  private saveCustomTemplates(): void {
    localStorage.setItem('ai-api-custom-templates', JSON.stringify(this.customTemplates));
  }

  /**
   * Load custom templates from localStorage
   */
  private loadCustomTemplates(): void {
    const saved = localStorage.getItem('ai-api-custom-templates');
    if (saved) {
      try {
        this.customTemplates = JSON.parse(saved).map((t: any) => ({
          ...t,
          created: new Date(t.created)
        }));
      } catch (error) {
        console.error('Error loading custom templates:', error);
        this.customTemplates = [];
      }
    }
  }

  /**
   * Export templates as JSON
   */
  exportTemplates(): void {
    const dataStr = JSON.stringify(this.customTemplates, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'ai-api-templates.json';
    link.click();
    
    URL.revokeObjectURL(url);
  }

  /**
   * Import templates from JSON file
   */
  importTemplates(event: Event): void {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target?.result as string);
        if (Array.isArray(imported)) {
          imported.forEach(template => {
            template.id = Date.now().toString() + Math.random();
            template.created = new Date();
          });
          this.customTemplates.push(...imported);
          this.saveCustomTemplates();
          alert(`Imported ${imported.length} templates successfully!`);
        }
      } catch (error) {
        alert('Invalid JSON file format');
      }
    };
    reader.readAsText(file);
    
    // Reset input
    target.value = '';
  }
}