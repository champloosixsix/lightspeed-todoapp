import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface User {
  id: number;
  name: string;
}

export interface Task {
  id: number;
  project_id: number;
  assigned_user_id: number;
  title: string;
  estimated_hours: number;
  assigned_user: User;
}

export interface Project {
  id: number;
  name: string;
  users: User[];
  tasks: Task[];
}

type BoardResponse = Project[] | { data: Project[] };

@Injectable({ providedIn: 'root' })
export class ProjectDataService {
  private http = inject(HttpClient);

  getBoard(): Observable<Project[]> {
    return this.http.get<BoardResponse>('/api/board').pipe(
      map((response) => (Array.isArray(response) ? response : response?.data ?? []))
    );
  }
}
