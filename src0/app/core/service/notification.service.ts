import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notifications: HTMLElement[] = [];

  constructor() {}

  /**
   * Show a notification message to the user
   * @param message The message text
   * @param type The type of notification (success, error, info, warning)
   * @param duration How long to show the notification in ms (default 3000ms)
   */
  show(message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info', duration: number = 3000): void {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} position-fixed top-0 start-50 translate-middle-x mt-3`;
    notification.style.zIndex = '9999';
    notification.style.minWidth = '300px';
    notification.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
    notification.style.transition = 'all 0.3s ease';
    
    // Add icon based on type
    let icon = '';
    switch (type) {
      case 'success':
        icon = '<i class="fas fa-check-circle me-2"></i>';
        break;
      case 'error':
        icon = '<i class="fas fa-exclamation-circle me-2"></i>';
        break;
      case 'info':
        icon = '<i class="fas fa-info-circle me-2"></i>';
        break;
      case 'warning':
        icon = '<i class="fas fa-exclamation-triangle me-2"></i>';
        break;
    }
    
    notification.innerHTML = `${icon}${message}`;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Store reference
    this.notifications.push(notification);
    
    // Adjust positions of multiple notifications
    this.adjustPositions();
    
    // Remove after duration
    setTimeout(() => {
      this.remove(notification);
    }, duration);
  }
  
  /**
   * Remove a notification from the DOM
   */
  private remove(notification: HTMLElement): void {
    // Remove from DOM
    document.body.removeChild(notification);
    
    // Remove from array
    const index = this.notifications.indexOf(notification);
    if (index !== -1) {
      this.notifications.splice(index, 1);
    }
    
    // Readjust positions
    this.adjustPositions();
  }
  
  /**
   * Adjust vertical positions of multiple notifications
   */
  private adjustPositions(): void {
    this.notifications.forEach((notif, index) => {
      const topPosition = 20 + (index * 70); // 20px initial + 70px per notification
      notif.style.top = `${topPosition}px`;
    });
  }
}