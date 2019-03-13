import { Injectable } from '@angular/core';
import { Task } from 'src/app/models/task';
import { Project } from 'src/app/models/project';
import { User } from 'src/app/models/user';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MockService {

  tasks: Task[];
  projects: Project[];
  users: User[];

  constructor() {
    this.tasks =
      [
        { taskId: 1, taskName: "Task 1", parentId: 2, parent: null, priority: 3, startDate: new Date(), endDate: new Date("2018-12-12"), projectId: 1, userId: 1, isParentTask: false },
        { taskId: 2, taskName: "Task 2", parentId: 0, parent: null, priority: 1, startDate: new Date("2018-11-11"), endDate: new Date("2019-12-06"), projectId: 2, userId: 2, isParentTask: false },
      ];

    this.projects =
      [
        { projectId: 1, projectName: 'Project 1', projectStartDate: new Date('2018-08-31'), projectEndDate: new Date('2018-12-31'), projectPriority: 15, projectUserId: 1, projectTotalTasks: 5, projectTasksCompleted: 2 },
        { projectId: 2, projectName: 'Project 2', projectStartDate: new Date(), projectEndDate: new Date('2019-01-09'), projectPriority: 5, projectUserId: 2, projectTotalTasks: 9, projectTasksCompleted: 4 }
      ]
    this.users =
      [
        { userId: 1, firstName: 'Tom', lastName: 'Murray', employeeId: 1, projectId: 1, taskId: 1 },
        { userId: 2, firstName: 'John', lastName: 'Chirsy', employeeId: 2, projectId: 1, taskId: 2 },
      ]
  }

  GetAllTasks(): Observable<Task[]> {
    return of(this.tasks);
  }

  GetAllParentTasks(): Observable<Task[]> {
    return of(this.tasks);
  }

  GetAllProjects(): Observable<Project[]> {
    return of(this.projects);
  }

  GetAllUsers(): Observable<User[]> {
    return of(this.users);
  }

  AddTask(task: Task): Observable<void> {
    console.log("Add Task is called for " + task.taskId);
    return of();
  }

  AddProject(project: Project): Observable<void> {
    console.log("Add Project is called for " + project.projectId);
    return of();
  }

  AddUser(user: User): Observable<void> {
    console.log("Add User is called for " + user.userId);
    return of();
  }

  UpdateTask(task: Task): Observable<void> {
    console.log("Update Task is called for " + task.taskId);
    return of();
  }

  UpdateProject(project: Project): Observable<void> {
    console.log("Update Project is called for " + project.projectId);
    return of();
  }

  UpdateUser(user: User): Observable<void> {
    console.log("Update User is called for " + user.userId);
    return of();
  }

  DeleteTask(id: number): Observable<void> {
    console.log("Delete Task is called for " + id);
    return of();
  }

  DeleteProject(id: number): Observable<void> {
    console.log("Delete Project is called for " + id);
    return of();
  }

  DeleteUser(id: number): Observable<void> {
    console.log("Delete User is called for " + id);
    return of();
  }

}
