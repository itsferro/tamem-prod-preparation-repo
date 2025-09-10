import { Component, Input, OnInit, OnDestroy, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TamemService } from '@/app/core/service/tamem-service.service';

@Component({
  selector: 'developments-html-viewer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './html-viewer.component.html',
  styleUrl: './html-viewer.component.scss'
})
export class DevelopmentHtmlViewerComponent implements OnInit, OnDestroy {

  @Input() frameId!: number;
  @Output() onClose = new EventEmitter<void>();
  @Output() onSave = new EventEmitter<{ frameId: number; combinedCode: string }>();

  // Modes
  mode: 'editor' | 'viewer' = 'editor';

  // Data
  rawHtmlCode = '';          // from API: getFrameHtml(frameId) -> html only
  editorCode = '';           // what the user edits; will hold combined code for saving
  combinedCodeCache = '';    // last combined file fetched from API
  versionId = 0 ; 

  // UI state
  isLoading = false;
  isSaving = false;
  loadError: string | null = null;

  private tamemService = inject(TamemService);

  ngOnInit(): void {
    this.getFrameHtmlDefault();
  }

  ngOnDestroy(): void {}

 

  // Get the full combined document from backend as ONE file (HTML+CSS+JS)
  getFrameHtmlDefault(): void {
    if (this.isLoading) return;
    this.isLoading = true;
    this.loadError = null;

    // Expected response shape: { combinedCode: string }
    this.tamemService.getFrameHtmlDefault(this.frameId).subscribe({
      next: (resp) => {
        this.combinedCodeCache = resp.data.html_code ?? '';
        // Put it into the editor so user can edit the FULL file
        this.editorCode = this.combinedCodeCache || this.buildBareHtml(this.rawHtmlCode);
        this.isLoading = false;
        this.versionId = resp.data.id;
        this.switchToViewer();
      },
      error: (err) => {
        this.loadError = 'Failed to load combined file.';
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  // === Viewer ===
  switchToViewer(): void {
    // Render whatever is in editorCode as a full page
    this.mode = 'viewer';
    setTimeout(() => this.renderIframe(this.editorCode), 0);
  }

  switchToEditor(): void {
    this.mode = 'editor';
  }

  private renderIframe(htmlDoc: string): void {
    const container = document.getElementById('html-viewer-container');
    if (!container) return;

    const iframe = document.createElement('iframe');
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';

    container.innerHTML = '';
    container.appendChild(iframe);

    const doc = iframe.contentDocument || iframe.contentWindow?.document;
    if (!doc) return;

    doc.open();
    doc.write(htmlDoc || this.buildBareHtml(this.rawHtmlCode));
    doc.close();
  }

  // === Save combined ===
  saveHtmlCode(): void {
    if (this.isSaving) return;
    this.isSaving = true;

    // Send the whole combined file (whatever is in editorCode) to backend
    this.tamemService.saveFrameHtmlCode(this.frameId, this.editorCode).subscribe({
      next: (resp) => {
        this.isSaving = false;
        // this.onSave.emit({ frameId: this.frameId, combinedCode: this.editorCode });
        // Optional: toast/snackbar
        console.log('Saved combined file for frame', this.frameId);
      },
      error: (err) => {
        this.isSaving = false;
        console.error('Save failed', err);
        alert('Save failed');
      }
    });
  }

    // === Save combined ===
    updateHtmlCode(): void {
      if (this.isSaving) return;
      this.isSaving = true;
  
      // Send the whole combined file (whatever is in editorCode) to backend
      this.tamemService.updateFrameHtmlCode(this.versionId, this.editorCode).subscribe({
        next: (resp) => {
          this.isSaving = false;
          // this.onSave.emit({ frameId: this.frameId, combinedCode: this.editorCode });
          // Optional: toast/snackbar
          console.log('Saved combined file for frame', this.versionId);
        },
        error: (err) => {
          this.isSaving = false;
          console.error('Save failed', err);
          alert('Save failed');
        }
      });
    }



  


  // Helper: wrap plain HTML into a minimal full document if needed
  private buildBareHtml(innerHtml: string): string {
    return `<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Frame ${this.frameId}</title>
</head>
<body>
${innerHtml || ''}
</body>
</html>`;
  }

  close(): void {
    this.onClose.emit();
  }



 



}
