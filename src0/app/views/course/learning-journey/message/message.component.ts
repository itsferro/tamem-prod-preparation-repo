// message/message.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface MessageRequest {
  type: string;
  options?: string[];
  context?: string;
  data?: any;
}

export interface MessageResponse {
  selectedResponse: string;
  messageTemplate?: string;
  data?: any;
}

@Component({
  selector: 'journey-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class MessageComponent {
  // @Input() messageType: 'intro' | 'success' | 'practice' | 'test' = 'intro';
  @Input() messageTemplate: string | undefined ;  // 'intro' | 'success' | 'practice' | 'test' = 'intro'; 
  @Input() messageData: any;
 
 
  // Renamed event emitter to be more generic
  @Output() messageResponse = new EventEmitter<MessageResponse>();

  Math = Math;

  // Renamed method to be more generic
  setResp(res: string): void {
    const response: MessageResponse = {
      selectedResponse: res,
      messageTemplate: this.messageTemplate,
      data: ''
    };

    this.messageResponse.emit(response);
  }
}