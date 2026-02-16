import { Component, OnInit, inject, ChangeDetectorRef, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectDataService, Project } from './services/project-data';

type ProjectRow = {
  id: number;
  name: string;
  memberCount: number;
  taskCount: number;
  estimatedHours: number;
};

type DeveloperRow = {
  userId: number;
  developer: string;
  taskCount: number;
  estimatedHours: number;
};

type TaskDetailRow = {
  taskId: number;
  taskName: string;
  assignedTo: string;
  estimatedHours: number;
};

type DeveloperProjectRow = {
  projectId: number;
  projectName: string;
  usersAssigned: string;
  estimatedHours: number;
};

type ViewMode = 'dashboard' | 'projectTasks' | 'developerProjects';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  private dataService = inject(ProjectDataService);
  private cdr = inject(ChangeDetectorRef);
  private zone = inject(NgZone);

  // Data shown in the two tables
  activeProjects: ProjectRow[] = [];
  tasksByDevelopers: DeveloperRow[] = [];

  // Data for detail views
    private sourceProjects: Project[] = [];

    currentView: ViewMode = 'dashboard';
    selectedProjectName = '';
    selectedDeveloperName = '';
    projectTaskRows: TaskDetailRow[] = [];
    developerProjectRows: DeveloperProjectRow[] = [];

  // Call backend once when page loads  
  ngOnInit(): void {
    this.dataService.getBoard().subscribe({
      next: (projects: Project[]) => {
        this.zone.run(() => {
          this.sourceProjects = projects;
          this.activeProjects = this.buildProjectRows(projects);
          this.tasksByDevelopers = this.buildDeveloperRows(projects);
          this.cdr.detectChanges();
        });
      },
      error: (err) => {
        console.error('Failed to load board, sigh.', err);
      },
    });
  }

  trackProjectById(index: number, row: ProjectRow): number {
    return row.id;
  }

  trackDeveloperById(index: number, row: DeveloperRow): number {
    return row.userId;
  }

  trackTaskById(index: number, row: TaskDetailRow): number {
    return row.taskId;
  }

  trackDeveloperProjectById(index: number, row: DeveloperProjectRow): number {
    return row.projectId;
  }

  openProjectTasks(projectId: number): void {
    const project = this.sourceProjects.find((p) => p.id === projectId);
    if (!project) return;

    this.selectedProjectName = project.name;
    this.projectTaskRows = this.buildTaskRows(project);
    this.currentView = 'projectTasks';
  }

  openDeveloperProjects(userId: number, developerName: string): void {
    this.selectedDeveloperName = developerName;
    this.developerProjectRows = this.buildDeveloperProjectRows(userId);
    this.currentView = 'developerProjects';
  }

  backToDashboard(): void {
    this.currentView = 'dashboard';
    this.selectedProjectName = '';
    this.selectedDeveloperName = '';
    this.projectTaskRows = [];
    this.developerProjectRows = [];
  }

  // Convert "5.00" or 5 into a number
  private toNumber(value: string | number | null | undefined): number {
    return Number(value ?? 0);
  }

  // Build left table: Active Projects
  private buildProjectRows(projects: Project[]): ProjectRow[] {
    return projects.map((p) => {
      let totalHours = 0;
      for (const task of p.tasks ?? []) {
        totalHours += this.toNumber(task.estimated_hours);
      }

      return {
        id: p.id,
        name: p.name,
        memberCount: p.users?.length ?? 0,
        taskCount: p.tasks?.length ?? 0,
        estimatedHours: totalHours,
      };
    });
  }

  // Build right table: Tasks by Developers
  private buildDeveloperRows(projects: Project[]): DeveloperRow[] {
    const byUser = new Map<number, DeveloperRow>();

    for (const project of projects) {
      for (const task of project.tasks ?? []) {
        const userId = task.assigned_user_id;
        const userName = task.assigned_user?.name ?? `User #${userId}`;

        if (!byUser.has(userId)) {
          byUser.set(userId, {
            userId,
            developer: userName,
            taskCount: 0,
            estimatedHours: 0,
          });
        }

        const row = byUser.get(userId)!;
        row.taskCount += 1;
        row.estimatedHours += this.toNumber(task.estimated_hours);
      }
    }

    return Array.from(byUser.values());
  }

  //Build specific project table
  private buildTaskRows(project: Project): TaskDetailRow[] {
    return (project.tasks ?? []).map((t) => ({
      taskId: t.id,
      taskName: (t as { name?: string; title?: string }).name ?? (t as { title?: string }).title ?? `Task #${t.id}`,
      assignedTo: t.assigned_user?.name ?? `User #${t.assigned_user_id}`,
      estimatedHours: this.toNumber(t.estimated_hours),
    }));
  }

  // Build specific developer table
  private buildDeveloperProjectRows(userId: number): DeveloperProjectRow[] {
    const rows: DeveloperProjectRow[] = [];

    for (const project of this.sourceProjects) {
      const hasTaskAssignedToUser = (project.tasks ?? []).some(
        (t) => t.assigned_user_id === userId
      );

      if (!hasTaskAssignedToUser) continue;

      const usersAssigned = (project.users ?? []).map((u) => u.name).join(', ');
      const estimatedHours = (project.tasks ?? []).reduce(
        (sum, t) => sum + this.toNumber(t.estimated_hours),
        0
      );

      rows.push({
        projectId: project.id,
        projectName: project.name,
        usersAssigned,
        estimatedHours,
      });
    }

    return rows;
  }
}