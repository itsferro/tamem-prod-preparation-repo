// /*********************/ Interfaces here  /**********************/

export interface ResourceData {
  resourceType: 'video' | 'pdf' | 'audio' | 'image';
  resourceUrl: string;
  duration?: number;          // Total duration of the resource in seconds
  minimumViewTime?: number;   // Minimum seconds needed to consider it "watched"
  requireFullView?: boolean;  // Must complete the entire resource
  applyWatchingRules?: boolean; // Whether to enforce minimum viewing requirements
}

export interface JourneyStep {
  // Core identification
  stepId: string;
  stepNo: number;
  type: string;  // Generic type string to allow for future types
  
  // Display information
  title: string;
  description?: string;
  typeText?: string;  // Display text for the type (اختيار من متعدد، فيديو, etc.)
  typeIcon?: string;  // Icon class for the type (fa-list-ul, fa-video, etc.)
  difficulty?: 'easy' | 'medium' | 'hard';
  points?: number;  // Points value for this step
  passingThreshold?: number;
  // Challenge connection
  challengeId: string;
  
  // Status tracking
  status: 'not_started' | 'in_progress' | 'completed';
  startedAt?: Date;
  completedAt?: Date;
  timeSpent?: number;  // Time spent on this step in seconds
  
  // Mode information
  currentMode?: 'practice' | 'test' | 'view';  // Current selected mode for this step
  
  // Practice mode data
  practiceAttempts: number;
  practiceScore?: number;
  
  // Test mode data
  testAttempts: number;
  testScore?: number;
  testPassed?: boolean;
  
  // Resource data (for video, pdf, etc.)
  resourceData?: ResourceData;

    // Timer value for questions in test mode (in seconds)
    timerSeconds?: number;
}


export interface BlockJourneySteps {
  steps: JourneyStep[];
  currentStepIndex: number;
  currentMode: 'practice' | 'test';
  journeyStartedAt?: Date;
  journeyCompletedAt?: Date;
  totalScore?: number;
}