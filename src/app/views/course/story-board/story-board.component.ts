import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppMenuComponent } from '@/app/components/app-menu/app-menu.components';
import { FooterComponent } from '@/app/components/footers/footer/footer.component';
import { ActivatedRoute } from '@angular/router';
import { TamemService } from '@/app/core/service/tamem-service.service';
import { FrameComponent, StoryboardFrameData } from './components/frame/frame.component';
import { AliComponent } from './components/ali/ali.component';
import { ImagePrompotComponent } from './components/image-prompot/image-prompot.component';
import { NotificationService } from '@/app/core/service/notification.service';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-story-board',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AppMenuComponent,
    FooterComponent,
    FrameComponent,
    AliComponent,
    ImagePrompotComponent
  ],
  templateUrl: './story-board.component.html',
  styleUrl: './story-board.component.scss'
})
export class StoryBoardComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private tamemService = inject(TamemService);
  private notificationService = inject(NotificationService);

  lessonBlockId: string | null = null;
  lessonBlock: any = null;
  isLoading: boolean = false;
  errorMessage: string | null = null;
  isGenerating: boolean = false;

  blockInsights: string = '';
  blockInsightsText: any = '';

  generateMode = 'content';  // specify what to use in generate , content , insights .
  // Storyboard AI generation prompt



  customPrompt: string = `You are an AI specialized in whiteboard animation planning with structured JSON output.
                          TASK: Analyze the provided educational content in Arabic and create a complete storyboard for whiteboard animation visualization.
                          PROCESS:
                          1. First determine how many scenes are needed to cover all concepts (maximum 5 scenes total)
                          2. For each scene:
                            - Analyze the main concept and supporting details
                            - Create a sequence of frames showing how the drawing builds up
                            - Break the voiceover to sync with each drawing element
                            - Calculate appropriate duration for each frame
                          CRITICAL INSTRUCTION: Your entire response MUST be a valid JSON object wrapped in \`\`\`json code blocks. Do not include any explanatory text before or after the JSON. The JSON must be parseable by standard JSON parsers without any modifications.
                          OUTPUT FORMAT: Provide your response EXACTLY like this:
                          \`\`\`json
                          {
                            "topic": "[Main topic in Arabic]",
                            "scenes": [
                              {
                                "sceneId": 1,
                                "title": "[Scene title in Arabic]",
                                "mainConcept": "[Core concept summary in Arabic]",
                                "layoutType": "",
                                "finalImagePrompt": "",
                                "frames": [
                                  {
                                    "frameNumber": 1,
                                    "elementDrawn": "[What is being drawn in this frame in Arabic]",
                                    "voiceover": "[Synchronized narration segment in Arabic]",
                                    "duration": 5,
                                    "visualState": "[Description of whiteboard at this moment in Arabic]",
                                    "animation": "[Description of animation in this frame in Arabic]",
                                    "onScreenText": ["Text or labels that appear on screen in Arabic"]
                                  }
                                ]
                              }
                            ]
                          }
                          \`\`\`

                          IMPORTANT RULES:
                          1. ONLY RESPOND WITH VALID JSON WRAPPED IN \`\`\`json CODE BLOCKS. No introductory text or explanations.
                          2. For each frame, duration calculation:
                            - For Arabic text: Estimate 2.5 words per second for narration
                            - Add 1-2 seconds buffer time for each segment
                            - Minimum duration of 3 seconds per frame
                          3. Include exactly 5 or fewer scenes total
                          4. "layoutType" and "finalImagePrompt" MUST BE EMPTY STRINGS (""). This is crucial! Do not put any text in these fields.
                          5. Write voiceover as if speaking DIRECTLY to 5th-grade students
                          6. NEVER mention learning objectives, goals, or "the purpose of this lesson" in the voiceover
                          7. Make sure each scene has at least 3 frames
                          8. "onScreenText" must be an array of strings, even if there's only one item
                          9. ALL your numeric values must be actual numbers (not strings in quotes)
                          10. Ensure ALL field names match exactly as shown in the example
                          11. never use Eastern Arabic numerals use only the modern Arabic numeral format (0, 1, 2, 3...) 

                          REMINDER: Your entire response must be exclusively a single valid JSON object inside \`\`\`json code blocks. Nothing else.`;


  customPrompt5: string = ` You are an AI specialized in whiteboard animation planning with structured JSON output.
        TASK: Analyze the provided educational content in Arabic and create a complete storyboard for whiteboard animation visualization.

        PROCESS:
        1. First determine how many scenes are needed to cover all concepts (each scene results in one final whiteboard image)
        2. For each scene:
          - Analyze the main concept and supporting details
          - Choose the most appropriate layout type (Linear Pathway, Comparison, Radial, Timeline, Process Cycle, or Quadrant)
          - Create a sequence of frames showing how the drawing builds up
          - Break the voiceover to sync with each drawing element
          - Calculate appropriate duration for each frame

        OUTPUT FORMAT: Provide your response as valid JSON with this exact structure:
        {
          "topic": "[Main topic in Arabic]",
          "scenes": [
            {
              "sceneId": [number],
              "title": "[Scene title in Arabic]",
              "mainConcept": "[Core concept summary in Arabic]",
              "layoutType": "[Keep it empty]",
              "finalImagePrompt": "[Keep it empty]",
              "frames": [
                {
                  "frameNumber": [number],
                  "elementDrawn": "[What is being drawn in this frame in Arabic]",
                  "voiceover": "[Synchronized narration segment in Arabic]",
                  "duration": [seconds calculated for this frame],
                  "visualState": "[Description of whiteboard at this moment in Arabic]",
                  "animation": "[Description of animation in this frame in Arabic]",
                  "onScreenText": ["Important text or labels that should appear on screen in Arabic"]
                },
                ...additional frames...
              ]
            },
            ...additional scenes...
          ]
        }

        IMPORTANT RULES:
        1. For each frame, duration calculation:
          - For Arabic text: Estimate 2.5 words per second for narration
          - Add 1-2 seconds buffer time for each segment
          - Minimum duration of 3 seconds per frame
          - the max scenes sholud be 5 scenes only 
          - Write voiceover as if speaking DIRECTLY to 5th-grade students
          - NEVER mention learning objectives, goals, or "the purpose of this lesson" in the voiceover
    ` ;





  customPrompt2: string = `You are an AI specialized in generating storyboards with structured JSON output.

Create a storyboard with multiple frames based on the provided Arabic text. Each frame should represent a key scene or moment from the text.

For each frame, provide:
1. A "title" in Arabic that summarizes the main idea of the scene
2. A "voiceover" with the segment of the original Arabic text
3. "duration" in seconds, calculated based on realistic narration timing:
   - For Arabic text, estimate 2.5 words per second for professional narration
   - Add 1-2 seconds of buffer time at the beginning and end of each segment
   - For segments with dialogue, allow more time (1.5 words per second)
   - Consider dramatic pauses where appropriate for storytelling
   - Ensure minimum duration of 3 seconds per frame
4. "visualContent" field that describes the visual elements in Arabic
5. "textOnScreen" array with important text elements to emphasize

Frame division rules:
- For short segments (under 10 seconds): Create a single frame
- For medium segments (10-15 seconds): Create a single detailed frame
- For long segments (over 15 seconds): Split into multiple frames, ensuring each has narrative completeness
- Avoid splitting mid-sentence whenever possible
- Maintain thematic coherence within each frame

Return a JSON structure with the following format:
{
  "frames": [
    {
      "title": "Arabic title",
      "voiceover": "Arabic text segment",
      "duration": 12.5,
      "visualContent": "Arabic description of visual elements",
      "textOnScreen": ["important text 1", "important text 2"]
    },
    // Additional frames
  ]
}`;

  showPromptEditor: boolean = false;

  // New property to manage frames
  frames: StoryboardFrameData[] = [];

  // Store actual frame file objects
  private frameFiles: Map<string, File> = new Map();

  ngOnInit(): void {
    // Subscribe to route params to get the lessonBlockId
    this.route.paramMap.subscribe(params => {
      this.lessonBlockId = params.get('lessonBlockId');

      if (this.lessonBlockId) {
        this.loadLessonBlock(this.lessonBlockId);
        this.loadKeyInsights(this.lessonBlockId);
      }
    });

    // Initialize with a default frame if no frames exist
    if (this.frames.length === 0) {
      this.addNewFrame();
    }
  }

  loadLessonBlock(blockId: string): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.tamemService.getLessonBlock(blockId).subscribe({
      next: (response) => {
        this.lessonBlock = response;
        this.isLoading = false;

        // After loading the lesson block, load the storyboard frames
        this.loadStoryboardFrames(blockId);
      },
      error: (error) => {
        console.error('Error loading lesson block:', error);
        this.errorMessage = 'فشل في تحميل بيانات الوحدة. يرجى المحاولة مرة أخرى.';
        this.isLoading = false;
      }
    });
  }

  loadStoryboardFrames(blockId: string): void {
    this.isLoading = true;

    this.tamemService.getStoryboardFrames(blockId).subscribe({
      next: (response) => {
        this.isLoading = false;

        if (response.success && response.frames && response.frames.length > 0) {
          this.frames = response.frames;
          console.log('Loaded storyboard frames:', this.frames);
        } else {
          // If no frames exist, create a default one
          this.addNewFrame();
        }
      },
      error: (error) => {
        console.error('Error loading storyboard frames:', error);
        this.isLoading = false;

        // If there's an error, create a default frame
        this.addNewFrame();
      }
    });
  }

  // Add a new frame to the storyboard
  addNewFrame(): void {
    const newFrame: StoryboardFrameData = {
      id: `frame_${Date.now()}`,
      title: `اللقطة ${this.frames.length + 1}`,
      lastModified: new Date(),
      resources: []
    };

    this.frames.push(newFrame);
  }

  // Toggle prompt editor visibility
  togglePromptEditor(): void {
    this.showPromptEditor = !this.showPromptEditor;
  }


  generateStoryboard(): void {

    // console.log(' block: ' + JSON.stringify(this.lessonBlock.block)) ;

    if (!this.lessonBlock?.block?.block_content) {
      this.errorMessage = 'لا يوجد محتوى للدرس لتوليد لوحة القصة.';
      return;
    }

    this.isGenerating = true;
    this.errorMessage = null;
    this.showPromptEditor = false; // Hide the prompt editor





    this.tamemService.generateStoryboard(this.lessonBlock.block.block_content, this.customPrompt, this.lessonBlock.block.id, this.blockInsightsText, this.generateMode).subscribe({
      next: (response) => {
        this.isGenerating = false;

        // Check if we got scenes in the response
        if (response && response.scenes && response.scenes.length > 0) {
          this.createFramesFromResponse(response);
        } else {
          // Legacy support for the old format
          if (response && response.frames && response.frames.length > 0) {
            this.createFramesFromResponse({ scenes: [{ frames: response.frames }] });
          } else {
            this.errorMessage = 'لم يتم الحصول على إطارات من الخدمة.';
          }
        }
      },
      error: (error) => {
        this.isGenerating = false;
        this.errorMessage = 'فشل في توليد لوحة القصة. يرجى المحاولة مرة أخرى.';
        console.error('Error generating storyboard:', error);
        this.loadLessonBlock(this.lessonBlock.block.id);
      }
    });
  }


  // Auto-generate storyboard from block content
  generateStoryboard2(): void {
    if (!this.lessonBlock?.block?.block_content) {
      this.errorMessage = 'لا يوجد محتوى للدرس لتوليد لوحة القصة.';
      return;
    }

    this.isGenerating = true;
    this.errorMessage = null;
    this.showPromptEditor = false; // Hide the prompt editor

    this.tamemService.generateStoryboard(this.lessonBlock.block.block_content, this.customPrompt, this.lessonBlock.block.id, this.blockInsightsText, this.generateMode).subscribe({
      next: (response) => {
        this.isGenerating = false;

        // Check if we got frames in the response
        if (response && response.frames && response.frames.length > 0) {
          this.createFramesFromResponse(response.frames);
        } else {
          this.errorMessage = 'لم يتم الحصول على إطارات من الخدمة.';
        }
      },
      error: (error) => {
        this.isGenerating = false;
        this.errorMessage = 'فشل في توليد لوحة القصة. يرجى المحاولة مرة أخرى.';
        console.error('Error generating storyboard:', error);
      

      }
    });

    

  }


  createFramesFromResponse(response: any): void {
    // Clear existing frames
    this.frames = [];

    // Colors to alternate between scenes
    const sceneColors = ['#f0f7ff', '#fff0f0', '#f0fff0', '#f7f0ff', '#fffaf0'];
    console.log('Response from AI:', response);



    // Process each scene in the response
    if (response.scenes && Array.isArray(response.scenes)) {
      response.scenes.forEach((scene: { frames: any[]; sceneId: any; title: any; finalImagePrompt: any; layoutType: any }, sceneIndex: number) => {
        const sceneColor = sceneColors[sceneIndex % sceneColors.length];
        // alert(JSON.stringify(scene.finalImagePrompt));
        const sceneImagePrompt = scene.finalImagePrompt;
        const sceneLayoutType = scene.layoutType;
        // Create frames for this scene
        if (scene.frames && Array.isArray(scene.frames)) {
          scene.frames.forEach((frameData, frameIndex) => {
            const newFrame: StoryboardFrameData = {
              id: `frame_${Date.now()}_${sceneIndex}_${frameIndex}`,
              title: 'المشهد' + ' (' + scene.sceneId + ') ',
              //  visualContentNotes: frameData.visualState || '',
              visualContentNotes: '📝  ' + frameData.elementDrawn + ':' + '\n\n' + '🎥  ' + frameData.visualState + '\n\n' + '🎭  ' + frameData.animation,

              voiceoverText: frameData.voiceover || '',
              // onScreenText: frameData.onScreenText || '',
              // onScreenText: frameData.onScreenText ? frameData.onScreenText.split(',').join('\n') : '',
              onScreenText: Array.isArray(frameData.onScreenText)
                ? frameData.onScreenText.join('\n')
                : (frameData.onScreenText || ''),
              notes: frameData.notes,
              extraReq: frameData.extraReq,
              sceneId: scene.sceneId || 1,
              sceneTitle: scene.title,
              sceneColor: sceneColor, // Add scene color for styling
              sceneImagePrompt: sceneImagePrompt,
              sceneLayoutType: sceneLayoutType,
              duration: frameData.duration || 0,
              lastModified: new Date(),
              resources: []
            };

            this.frames.push(newFrame);
            console.log(this.frames)
          });
        }
      });
    }
  }




  // Handle frame content updates
  onFrameContentUpdated(event: { frame: StoryboardFrameData, field: string }): void {
    const index = this.frames.findIndex(f => f.id === event.frame.id);
    if (index !== -1) {
      this.frames[index] = { ...event.frame };
      console.log(`Frame ${event.frame.id} updated in field: ${event.field}`);
    }
  }

  // Handle file uploads from frame component
  onFileUploaded(event: { frame: StoryboardFrameData, file: File }): void {
    // Store the file in our map with the frame id as the key
    this.frameFiles.set(event.frame.id.toString(), event.file);
    console.log(`File stored for frame ${event.frame.id}:`, event.file.name);
  }

  // Handle frame deletion
  onFrameDeleted(frame: StoryboardFrameData): void {
    // Remove frame file if exists
    if (this.frameFiles.has(frame.id.toString())) {
      this.frameFiles.delete(frame.id.toString());
    }

    this.frames = this.frames.filter(f => f.id !== frame.id);

    // Ensure at least one frame exists
    if (this.frames.length === 0) {
      this.addNewFrame();
    }
  }

  // Handle frame movement
  onFrameMoved(event: { frame: StoryboardFrameData, direction: number }): void {
    const currentIndex = this.frames.findIndex(f => f.id === event.frame.id);

    if (currentIndex !== -1) {
      const newIndex = currentIndex + event.direction;

      // Ensure new index is within bounds
      if (newIndex >= 0 && newIndex < this.frames.length) {
        // Swap frames
        [this.frames[currentIndex], this.frames[newIndex]] =
          [this.frames[newIndex], this.frames[currentIndex]];
      }
    }
  }

  saveStoryboard(): void {
    if (!this.lessonBlockId) {
      console.error('No lesson block selected');
      this.notificationService.show('لم يتم تحديد وحدة الدرس', 'error');
      return;
    }

    if (this.frames.length === 0) {
      this.notificationService.show('لا توجد إطارات لحفظها', 'warning');
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;

    // Show loading notification
    this.notificationService.show('جاري حفظ لوحة القصة...', 'info');



    // Prepare storyboard data 
    const storyboardData = {
      lesson_block_id: this.lessonBlockId,
      frames: this.frames.map(frame => ({
        id: frame.id,
        title: frame.title || '',
        visualContentNotes: frame.visualContentNotes || '',
        voiceoverText: frame.voiceoverText || '',
        onScreenText: frame.onScreenText || '',
        notes: frame.notes || '',
        extraReq: frame.extraReq || '',
        sceneId: frame.sceneId || 1,
        sceneTitle: frame.sceneTitle || '',
        sceneColor: frame.sceneColor || '',
        imageUrl: frame.imageUrl || '',
        imagePrompt: frame.imagePrompt || '',
        sceneImagePrompt: frame.sceneImagePrompt || '',
        sceneLayoutType: frame.sceneLayoutType || '',
        duration: frame.duration || 0,
        resources: Array.isArray(frame.resources)
          ? frame.resources.filter(r => r && r.url && r.url.trim() !== '')
          : []
      }))
    };



    // Create FormData to send both JSON data and files
    const formData = new FormData();

    // Add the storyboard data as JSON string
    formData.append('storyboardData', JSON.stringify(storyboardData));


    // Add all image files to FormData
    this.frames.forEach((frame, index) => {
      // If we have a file stored for this frame, add it to FormData
      if (this.frameFiles.has(frame.id.toString())) {
        const file = this.frameFiles.get(frame.id.toString());
        if (file) {
          formData.append(`image_${index}`, file, file.name);
          console.log(`Adding file for frame ${index}:`, file.name);
        }
      }
    });

    // Log the FormData keys for debugging
    console.log('FormData entries:', Array.from((formData as any).keys()));

    // Use the saveStoryboard method in TamemService


    this.tamemService.saveStoryboard(formData).subscribe({
      next: (response: any) => {
        console.log('Storyboard saved successfully', response);
        this.isLoading = false;
        this.notificationService.show('تم حفظ لوحة القصة بنجاح', 'success');
      },
      error: (error: any) => {
        console.error('Error saving storyboard:', error);
        this.isLoading = false;
        this.errorMessage = 'فشل في حفظ لوحة القصة. يرجى المحاولة مرة أخرى.';
        this.notificationService.show('فشل في حفظ لوحة القصة', 'error');
      }
    });
  }


  loadKeyInsights2(blockId: any) {

    this.tamemService.getKeyInsights(blockId).subscribe({
      next: (response) => {
        // Handle successful creation
        console.log(response.data);

        //   this.blockInsights = response.data ; 
        this.blockInsights = response.map((insight: any) => insight.insight_text).join('\n');


      },
      error: (error) => {
        // Handle error
        // this.handleErrorResponse(error);
      }
    });

  }




  loadKeyInsights(blockId: any) {
    this.tamemService.getKeyInsights(blockId).subscribe({
      next: (response) => {
        // Store the original array for HTML rendering
        this.blockInsights = response.data || response;

        // Create a formatted string version
        let formattedInsights = '';

        (response.data || response).forEach((insight: any) => {
          formattedInsights += insight.learning_objective + ' (' + insight.difficulty_level + ')\n';
          formattedInsights += insight.insight_text + '\n\n';
        });

        // Store the formatted string in a variable
        this.blockInsightsText = formattedInsights.trim();

        //  console.log(this.blockInsightsText);
      },
      error: (error) => {
        // Handle error
      }
    });
  }




}