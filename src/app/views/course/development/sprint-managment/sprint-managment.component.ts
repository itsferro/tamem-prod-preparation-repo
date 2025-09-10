import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TamemService } from '@/app/core/service/tamem-service.service';
import { UserService } from '@/app/core/service/user-service.service';

interface TeamMember {
  id: number;
  name: string;
  email: string;
  role?: string;
}

interface Frame {
  id: number;
  name: string;
  completedAt?: string;
  assignedTo?: number;
}

interface KeyInsight {
  id: number;
  name: string;
  frames: Frame[];
  assignedTo?: number;
}

interface Block {
  id: number;
  name: string;
  lessonName: string;
  keyInsights: KeyInsight[];
  assignedTo?: number;
}

interface AssignmentRecord {
  id: number;
  group_id: number;
  member_id: number;
  member_name: string;
  assignment_type: 'block' | 'custom';
  task_name: string;
  task_description: string;
  group_name: string;
  item_name: string;
  completed_at: string | null;
  created_at: string;
}

interface Assignment {
  id: number; // Using id for grouping
  memberId: number;
  memberName: string;
  assignmentDate: string;
  assignmentType: 'block' | 'custom';
  taskName: string;
  taskDescription: string;
  
  // Internal data structure
  assignedItems: {
    [groupName: string]: {
      name: string;
      items: { name: string; id: number; completedAt?: string }[];
    };
  };
}

@Component({
  selector: 'development-sprint-managment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sprint-managment.component.html',
  styleUrl: './sprint-managment.component.scss'
})
export class SprintManagmentComponent implements OnInit {
  // Current user role (admin or member)
  currentUserRole: 'admin' | 'member' = 'admin';
  currentUserId: number = 1;

  // Data arrays
  teamMembers: TeamMember[] = [];
  blocks: Block[] = [];
  assignments: Assignment[] = [];
  assignmentRecords: AssignmentRecord[] = [];

  // Loading states
  isLoadingTeamMembers = false;
  isLoadingBlocks = false;
  isLoadingAssignments = false;
  isCreatingAssignment = false;
  isCreatingCustomAssignment = false;

  // Error states
  error: string | null = null;

  // UI State
  selectedDate: string = new Date().toISOString().split('T')[0];
  showAssignmentModal: boolean = false;
  selectedMember: number | null = null;
  selectedBlock: number | null = null;
  selectedInsights: number[] = [];
  selectedFrames: number[] = [];
  blockAssignmentType: 'full_block' | 'insights' | 'frames' = 'full_block';
  taskPrefix: string = '';
  taskShortNames: string[] = [];
  
  // Custom assignment creation
  showCustomAssignmentModal: boolean = false;
  customTaskName: string = '';
  customTaskDescription: string = '';
  customAssignmentMember: number | null = null;
  customTaskPhases: Array<{name: string, steps: Array<{name: string}>}> = [
    { name: 'Phase 1', steps: [{ name: 'Step 1' }] }
  ];

  constructor(
    private tamemService: TamemService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.setUserRoleFromAuth();
    console.log('Current user role:', this.currentUserRole);
    this.loadInitialData();
  }

  // Load all initial data
  private loadInitialData(): void {
    this.loadTeamMembers();
    this.loadBlocks();
    this.loadAssignments();
  }

  // Load team members from API
  private loadTeamMembers(): void {
    this.isLoadingTeamMembers = true;
    this.tamemService.getTeamMembers().subscribe({
      next: (response) => {
        this.teamMembers = response.data.team_members || [];
        this.isLoadingTeamMembers = false;
      },
      error: (error) => {
        console.error('Error loading team members:', error);
        this.error = 'Failed to load team members';
        this.isLoadingTeamMembers = false;
      }
    });
  }

  // Load blocks from API
  private loadBlocks(): void {
    this.isLoadingBlocks = true;
    this.tamemService.getSprintBlocks().subscribe({
      next: (blocks) => {
        this.blocks = blocks;
        this.isLoadingBlocks = false;
      },
      error: (error) => {
        console.error('Error loading blocks:', error);
        this.error = 'Failed to load blocks';
        this.isLoadingBlocks = false;
      }
    });
  }

  // Load assignments from API
  private loadAssignments(): void {
    this.isLoadingAssignments = true;
    console.log('Loading assignments for date:', this.selectedDate);
    
    this.tamemService.getSprintAssignments(this.selectedDate).subscribe({
      next: (assignmentRecords) => {
        console.log('Raw assignment records from API:', assignmentRecords);
        this.assignmentRecords = assignmentRecords;
        this.assignments = this.groupAssignmentRecords(assignmentRecords);
        console.log('Transformed assignments:', this.assignments);
        this.isLoadingAssignments = false;
      },
      error: (error) => {
        console.error('Error loading assignments:', error);
        this.error = 'Failed to load assignments';
        this.isLoadingAssignments = false;
      }
    });
  }

  // Group assignment records by id (updated grouping logic)
  private groupAssignmentRecords(records: AssignmentRecord[]): Assignment[] {
    const grouped: { [groupId: number]: Assignment } = {};

    records.forEach(record => {
      if (!grouped[record.group_id]) {
        grouped[record.group_id] = {
          id: record.group_id, // Use group_id as assignment ID
          memberId: record.member_id,
          memberName: record.member_name,
          assignmentDate: record.created_at.split(' ')[0],
          assignmentType: record.assignment_type,
          taskName: record.task_name,
          taskDescription: record.task_description,
          assignedItems: {}
        };
      }

      const assignment = grouped[record.group_id];
      
      if (!assignment.assignedItems[record.group_name]) {
        assignment.assignedItems[record.group_name] = {
          name: record.group_name,
          items: []
        };
      }

      assignment.assignedItems[record.group_name].items.push({
        id: record.id, // Keep individual record ID for completion tracking
        name: record.item_name,
        completedAt: record.completed_at || undefined
      });
    });

    return Object.values(grouped);
  }

  // Called when date changes
  onDateChange(): void {
    this.loadAssignments();
  }

  // Get assignments for selected date
  getTodayAssignments(): Assignment[] {
    return this.assignments.filter(a => a.assignmentDate === this.selectedDate);
  }

  // Get assignments for current user if they're a member
  getMyAssignments(): Assignment[] {
    return this.assignments.filter(a => 
      a.assignmentDate === this.selectedDate && a.memberId === this.currentUserId
    );
  }

  // Open block assignment modal
  openAssignmentModal(): void {
    this.showAssignmentModal = true;
    this.selectedMember = null;
    this.selectedBlock = null;
    this.selectedInsights = [];
    this.selectedFrames = [];
    this.blockAssignmentType = 'full_block';
    this.taskPrefix = '';
    this.taskShortNames = [];
  }

  // Close assignment modal
  closeAssignmentModal(): void {
    this.showAssignmentModal = false;
  }

  // Open custom assignment modal
  openCustomAssignmentModal(): void {
    this.showCustomAssignmentModal = true;
    this.customTaskName = '';
    this.customTaskDescription = '';
    this.customAssignmentMember = null;
    this.customTaskPhases = [
      { name: 'Phase 1', steps: [{ name: 'Step 1' }] }
    ];
  }

  // Close custom assignment modal
  closeCustomAssignmentModal(): void {
    this.showCustomAssignmentModal = false;
  }

  // Add new phase to custom assignment
  addPhase(): void {
    const phaseNumber = this.customTaskPhases.length + 1;
    this.customTaskPhases.push({
      name: `Phase ${phaseNumber}`,
      steps: [{ name: 'Step 1' }]
    });
  }

  // Remove phase from custom assignment
  removePhase(index: number): void {
    if (this.customTaskPhases.length > 1) {
      this.customTaskPhases.splice(index, 1);
    }
  }

  // Add step to phase
  addStep(phaseIndex: number): void {
    const stepNumber = this.customTaskPhases[phaseIndex].steps.length + 1;
    this.customTaskPhases[phaseIndex].steps.push({ name: `Step ${stepNumber}` });
  }

  // Remove step from phase
  removeStep(phaseIndex: number, stepIndex: number): void {
    if (this.customTaskPhases[phaseIndex].steps.length > 1) {
      this.customTaskPhases[phaseIndex].steps.splice(stepIndex, 1);
    }
  }

  // Create custom assignment directly
  createCustomAssignment(): void {
    if (!this.customTaskName.trim()) {
      alert('Please enter a task name');
      return;
    }
    
    if (!this.customAssignmentMember) {
      alert('Please select a team member to assign this task to');
      return;
    }

    this.isCreatingCustomAssignment = true;
    
    const memberId = Number(this.customAssignmentMember);
    const member = this.teamMembers.find(m => m.id === memberId);
    
    if (!member) {
      alert('Selected team member not found');
      this.isCreatingCustomAssignment = false;
      return;
    }

    // Build assigned items array from phases and steps
    const assignedItems: Array<{groupName: string, itemName: string}> = [];
    this.customTaskPhases.forEach(phase => {
      phase.steps.forEach(step => {
        assignedItems.push({
          groupName: phase.name,
          itemName: step.name
        });
      });
    });

    const assignmentRequest = {
      memberId: memberId,
      memberName: member.name,
      assignmentType: 'custom' as const,
      taskName: this.customTaskName.trim(),
      taskDescription: this.customTaskDescription.trim(),
      assignedItems: assignedItems
    };

    this.tamemService.createSprintAssignment(assignmentRequest).subscribe({
      next: (response) => {
        console.log('Custom assignment created:', response);
        // Add the new assignment records to local array
        this.assignmentRecords = [...this.assignmentRecords, ...response.assignment.records];
        // Regroup assignments
        this.assignments = this.groupAssignmentRecords(this.assignmentRecords);
        // Close modal and reset form
        this.closeCustomAssignmentModal();
        this.isCreatingCustomAssignment = false;
      },
      error: (error) => {
        console.error('Error creating custom assignment:', error);
        alert('Failed to create custom assignment. Please try again.');
        this.isCreatingCustomAssignment = false;
      }
    });
  }

  // Get insights for selected block
  getSelectedBlockInsights(): KeyInsight[] {
    if (!this.selectedBlock) return [];
    const block = this.blocks.find(b => b.id == this.selectedBlock);
    return block ? block.keyInsights : [];
  }

  // Handle block selection change
  onBlockSelectionChange(): void {
    if (this.selectedBlock) {
      this.loadTaskShortNames(Number(this.selectedBlock));
    } else {
      this.taskShortNames = [];
      this.taskPrefix = '';
    }
  }

  // Load task short names for the selected block
  private loadTaskShortNames(blockId: number): void {
    this.tamemService.getBlockTasks(blockId).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.taskShortNames = response.data
            .map((task: any) => task.taskShortName)
            .filter((shortName: string) => shortName && shortName.trim() !== '')
            .filter((shortName: string, index: number, arr: string[]) => 
              arr.indexOf(shortName) === index // Remove duplicates
            );
          console.log('Task short names loaded:', this.taskShortNames);
        } else {
          this.taskShortNames = [];
        }
      },
      error: (error) => {
        console.error('Error loading task short names:', error);
        this.taskShortNames = [];
      }
    });
  }

  getTaskNamePreview(): string {
    if (!this.selectedBlock || !this.taskPrefix.trim()) {
      return '';
    }
    
    const block = this.blocks.find(b => b.id == this.selectedBlock);
    if (!block) {
      return this.taskPrefix.trim() + ' - Block Name';
    }
    
    return this.taskPrefix.trim() + ' - ' + block.lessonName + ' - ' + block.name;
  }

  // Create new block assignment
  createAssignment(): void {
    if (!this.selectedMember) {
      alert('Please select a team member');
      return;
    }

    if (!this.selectedBlock) {
      alert('Please select a block');
      return;
    }

    this.isCreatingAssignment = true;

    const memberId = Number(this.selectedMember);
    const member = this.teamMembers.find(m => m.id === memberId);
    
    if (!member) {
      alert('Selected team member not found');
      this.isCreatingAssignment = false;
      return;
    }

    const blockId = Number(this.selectedBlock);
    const block = this.blocks.find(b => b.id === blockId);
    
    if (!block) {
      alert('Selected block not found');
      this.isCreatingAssignment = false;
      return;
    }

    const taskName = `${block.lessonName} - ${block.name}`;
    const taskDescription = block.name;

    // Add task prefix if provided
    const finalTaskName = this.taskPrefix.trim() 
      ? `${this.taskPrefix.trim()} - ${taskName}` 
      : taskName;

    // Build assigned items array
    const assignedItems: Array<{groupName: string, itemName: string}> = [];

    if (this.blockAssignmentType === 'full_block') {
      // Add all frames from all insights
      block.keyInsights.forEach(insight => {
        insight.frames.forEach(frame => {
          assignedItems.push({
            groupName: insight.name,
            itemName: frame.name
          });
        });
      });
    } else if (this.blockAssignmentType === 'insights') {
      // Add frames from selected insights
      this.selectedInsights.forEach(insightId => {
        const insight = block.keyInsights.find(i => i.id === insightId);
        if (insight) {
          insight.frames.forEach(frame => {
            assignedItems.push({
              groupName: insight.name,
              itemName: frame.name
            });
          });
        }
      });
    } else if (this.blockAssignmentType === 'frames') {
      // Add specific frames
      this.selectedFrames.forEach(frameId => {
        const insight = block.keyInsights.find(i => i.frames.some(f => f.id === frameId));
        const frame = insight?.frames.find(f => f.id === frameId);
        if (insight && frame) {
          assignedItems.push({
            groupName: insight.name,
            itemName: frame.name
          });
        }
      });
    }

    const assignmentRequest = {
      memberId: memberId,
      memberName: member.name,
      assignmentType: 'block' as const,
      taskName: finalTaskName,
      taskDescription: taskDescription,
      assignedItems: assignedItems
    };

    this.tamemService.createSprintAssignment(assignmentRequest).subscribe({
      next: (response) => {
        console.log('Block assignment created:', response);
        // Add the new assignment records to local array
        this.assignmentRecords = [...this.assignmentRecords, ...response.assignment.records];
        // Regroup assignments
        this.assignments = this.groupAssignmentRecords(this.assignmentRecords);
        this.closeAssignmentModal();
        this.isCreatingAssignment = false;
      },
      error: (error) => {
        console.error('Error creating assignment:', error);
        alert('Failed to create assignment. Please try again.');
        this.isCreatingAssignment = false;
      }
    });
  }

  // Log step/frame completion
  logItemCompletion(itemId: number): void {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit' 
    });

    this.tamemService.completeSprintFrame(itemId, timeString).subscribe({
      next: (response) => {
        console.log('Item completed:', response);
        // Update local data
        this.updateLocalItemCompletion(itemId, response.completedAt);
      },
      error: (error) => {
        console.error('Error completing item:', error);
        alert('Failed to mark item as completed');
      }
    });
  }

  // Update local item completion data
  private updateLocalItemCompletion(itemId: number, completedAt: string): void {
    // Update in assignment records
    const record = this.assignmentRecords.find(r => r.id === itemId);
    if (record) {
      record.completed_at = completedAt;
      // Regroup assignments to update UI
      this.assignments = this.groupAssignmentRecords(this.assignmentRecords);
    }
  }

  // Check if item is completed
  isItemCompleted(itemId: number): boolean {
    const record = this.assignmentRecords.find(r => r.id === itemId);
    return !!record?.completed_at;
  }

  // Get item completion time
  getItemCompletionTime(itemId: number): string {
    const record = this.assignmentRecords.find(r => r.id === itemId);
    return record?.completed_at || '';
  }

  // Calculate assignment progress
  getAssignmentProgress(assignment: Assignment): { completed: number; total: number; percentage: number } {
    let completed = 0;
    let total = 0;

    Object.values(assignment.assignedItems).forEach(group => {
      total += group.items.length;
      completed += group.items.filter(item => !!item.completedAt).length;
    });

    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { completed, total, percentage };
  }

  // Toggle user role for demo purposes
  toggleUserRole(): void {
    if (this.currentUserRole === 'admin') {
      this.currentUserRole = 'member';
      this.currentUserId = 2;
    } else {
      this.currentUserRole = 'admin';
      this.currentUserId = 1;
    }
    console.log('Switched to:', this.currentUserRole, 'User ID:', this.currentUserId);
    this.loadAssignments();
  }

  // Toggle insight selection
  toggleInsightSelection(insightId: number): void {
    const index = this.selectedInsights.indexOf(insightId);
    if (index > -1) {
      this.selectedInsights.splice(index, 1);
    } else {
      this.selectedInsights.push(insightId);
    }
  }

  // Toggle frame selection
  toggleFrameSelection(frameId: number): void {
    const index = this.selectedFrames.indexOf(frameId);
    if (index > -1) {
      this.selectedFrames.splice(index, 1);
    } else {
      this.selectedFrames.push(frameId);
    }
  }

  // Helper methods
  getGroupNames(assignment: Assignment): string[] {
    return Object.keys(assignment.assignedItems);
  }

  getItemAtIndex(assignment: Assignment, groupName: string, index: number): any {
    return assignment.assignedItems[groupName]?.items[index] || null;
  }

  getMaxItemsCount(assignment: Assignment): number {
    let maxCount = 0;
    Object.values(assignment.assignedItems).forEach(group => {
      if (group.items.length > maxCount) {
        maxCount = group.items.length;
      }
    });
    return maxCount;
  }

  createArray(length: number): any[] {
    return Array(length).fill(0);
  }

  // Get all frames for frame selection mode
  getAllFramesForBlock(): Frame[] {
    if (!this.selectedBlock) return [];
    const block = this.blocks.find(b => b.id == this.selectedBlock);
    if (!block) return [];
    
    const frames: Frame[] = [];
    block.keyInsights.forEach(insight => {
      frames.push(...insight.frames);
    });
    return frames;
  }

  // Clear error
  clearError(): void {
    this.error = null;
  }

  private setUserRoleFromAuth(): void {
    console.log('Setting user role from auth');
    const user = this.userService.getUser();
    if (user) {
      console.log('User found:', user);
      const userType = user.role;
      this.currentUserRole = userType === 'admin' ? 'admin' : 'member';
      this.currentUserId = typeof user.id === 'number'
        ? user.id
        : Number(user.id) || 1;
      console.log('Current user role:', this.currentUserRole);
      console.log('Current user ID:', this.currentUserId);
    }
  }

  deleteAssignmentGroup(groupId: number): void {
    this.tamemService.deleteSprintAssignment(groupId).subscribe({
      next: () => {
        console.log('Assignment group deleted:', groupId);
        this.loadAssignments();
      },
      error: (err: any) => {
        console.error('Error deleting assignment group:', err);
      }
    });
  }
}