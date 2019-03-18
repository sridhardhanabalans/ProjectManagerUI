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

  //URL Used for for Hosting or accessing Web API Services
  baseApiURL: string = "http://localhost:50098/api/Values/";
  //baseApiURL: string = "http://localhost/ProjectManagerAPI/api/Values/";

  //Get All Tasks call to Web API
  GetAllTasks(): Observable<Task[]>
  {
    const URL = this.baseApiURL.concat("GetAllTasks");
    return this.httpClient.get<Task[]>(URL)
    .pipe(catchError(this._handleError));
  }
//Get All Parent Tasks call to Web API
  GetAllParentTasks(): Observable<Task[]>
  {
    const URL = this.baseApiURL.concat("GetAllParentTasks");
    return this.httpClient.get<Task[]>(URL)
    .pipe(catchError(this._handleError));
  }
//Get All Projects call to Web API

  GetAllProjects(): Observable<Project[]>
  {
    const URL = this.baseApiURL.concat("GetAllProjects");
    return this.httpClient.get<Project[]>(URL)
    .pipe(catchError(this._handleError));
  }
//Get All Users call to Web API

  GetAllUsers(): Observable<User[]>
  {
    const URL = this.baseApiURL.concat("GetAllUsers");
    return this.httpClient.get<User[]>(URL)
    .pipe(catchError(this._handleError));
  }

  //Add New Task call to Web API

  AddTask(task: Task): Observable<void>
  {
    const URL = this.baseApiURL.concat("AddTask");
    return this.httpClient.post<void>(URL,task)
    .pipe(catchError(this._handleError));
  }

  //Add New Project call to Web API

  AddProject(project: Project): Observable<void>
  {
    const URL = this.baseApiURL.concat("AddProject");
    return this.httpClient.post<void>(URL,project)
    .pipe(catchError(this._handleError));
  }
  //Add New User call to Web API

  AddUser(user: User): Observable<void>
  {
    const URL = this.baseApiURL.concat("AddUser");
    return this.httpClient.post<void>(URL,user)
    .pipe(catchError(this._handleError));
  }
  //Update Existing Task call to Web API

  UpdateTask(task: Task): Observable<void>
  {
    const URL = this.baseApiURL.concat("UpdateTask");
    return this.httpClient.put<void>(URL,task)
    .pipe(catchError(this._handleError));
  }
  //Update Existing Project call to Web API

  UpdateProject(project: Project): Observable<void>
  {
    const URL = this.baseApiURL.concat("UpdateProject");
    return this.httpClient.put<void>(URL,project)
    .pipe(catchError(this._handleError));
  }
  //Update Existing User call to Web API

  UpdateUser(user: User): Observable<void>
  {
    const URL = this.baseApiURL.concat("UpdateUser");
    return this.httpClient.put<void>(URL,user)
    .pipe(catchError(this._handleError));
  }
  //Delete Existing Task call to Web API

  DeleteTask(id: number): Observable<void>
  {
    const URL = this.baseApiURL.concat("DeleteTask/",id.toString());
    return this.httpClient.delete<void>(URL)
    .pipe(catchError(this._handleError));
  }
  //Update Existing Project call to Web API

  DeleteProject(id: number): Observable<void>
  {
    const URL = this.baseApiURL.concat("DeleteProject/",id.toString());
    return this.httpClient.delete<void>(URL)
    .pipe(catchError(this._handleError));
  }
  //Update Existing User call to Web API

  DeleteUser(id: number): Observable<void>
  {
    const URL = this.baseApiURL.concat("DeleteUser/",id.toString());
    return this.httpClient.delete<void>(URL)
    .pipe(catchError(this._handleError));
  }
  //Error Handling Method

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
