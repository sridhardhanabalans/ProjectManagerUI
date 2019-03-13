import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, throwError as observableThrowError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Task } from 'src/app/models/task';
import { Project } from 'src/app/models/project';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private httpClient: HttpClient) { }

  //baseApiURL: string = "http://localhost:50098/api/Values/";
  baseApiURL: string = "http://localhost/ProjectManagerAPI/api/Values/";

  GetAllTasks(): Observable<Task[]>
  {
    const URL = this.baseApiURL.concat("GetAllTasks");
    return this.httpClient.get<Task[]>(URL)
    .pipe(catchError(this._handleError));
  }

  GetAllParentTasks(): Observable<Task[]>
  {
    const URL = this.baseApiURL.concat("GetAllParentTasks");
    return this.httpClient.get<Task[]>(URL)
    .pipe(catchError(this._handleError));
  }

  GetAllProjects(): Observable<Project[]>
  {
    const URL = this.baseApiURL.concat("GetAllProjects");
    return this.httpClient.get<Project[]>(URL)
    .pipe(catchError(this._handleError));
  }

  GetAllUsers(): Observable<User[]>
  {
    const URL = this.baseApiURL.concat("GetAllUsers");
    return this.httpClient.get<User[]>(URL)
    .pipe(catchError(this._handleError));
  }

  AddTask(task: Task): Observable<void>
  {
    const URL = this.baseApiURL.concat("AddTask");
    return this.httpClient.post<void>(URL,task)
    .pipe(catchError(this._handleError));
  }

  AddProject(project: Project): Observable<void>
  {
    const URL = this.baseApiURL.concat("AddProject");
    return this.httpClient.post<void>(URL,project)
    .pipe(catchError(this._handleError));
  }

  AddUser(user: User): Observable<void>
  {
    const URL = this.baseApiURL.concat("AddUser");
    return this.httpClient.post<void>(URL,user)
    .pipe(catchError(this._handleError));
  }

  UpdateTask(task: Task): Observable<void>
  {
    const URL = this.baseApiURL.concat("UpdateTask");
    return this.httpClient.put<void>(URL,task)
    .pipe(catchError(this._handleError));
  }

  UpdateProject(project: Project): Observable<void>
  {
    const URL = this.baseApiURL.concat("UpdateProject");
    return this.httpClient.put<void>(URL,project)
    .pipe(catchError(this._handleError));
  }

  UpdateUser(user: User): Observable<void>
  {
    const URL = this.baseApiURL.concat("UpdateUser");
    return this.httpClient.put<void>(URL,user)
    .pipe(catchError(this._handleError));
  }

  DeleteTask(id: number): Observable<void>
  {
    const URL = this.baseApiURL.concat("DeleteTask/",id.toString());
    return this.httpClient.delete<void>(URL)
    .pipe(catchError(this._handleError));
  }

  DeleteProject(id: number): Observable<void>
  {
    const URL = this.baseApiURL.concat("DeleteProject/",id.toString());
    return this.httpClient.delete<void>(URL)
    .pipe(catchError(this._handleError));
  }

  DeleteUser(id: number): Observable<void>
  {
    const URL = this.baseApiURL.concat("DeleteUser/",id.toString());
    return this.httpClient.delete<void>(URL)
    .pipe(catchError(this._handleError));
  }

  private _handleError(error: any): Observable<never>
  {
   if(error && error.error) 
   {
    return observableThrowError(error.error);
   }
   const errMsg=(error.message)? error.message : error.status ? '${error.status} - ${error.statusText}' : 'An unidentified error occurred. Time to debug!';
   return observableThrowError(errMsg);
  }
}
