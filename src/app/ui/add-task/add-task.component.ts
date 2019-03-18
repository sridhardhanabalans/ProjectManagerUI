import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { Task } from 'src/app/models/task';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Project } from 'src/app/models/project';
import { User } from 'src/app/models/user';
import { SharedService } from 'src/app/services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  task: Task = {
    taskId: null,
    taskName: null,
    projectId: null,
    parentId: null,
    userId: null,
    parent: null,
    priority: null,
    startDate: null,
    endDate: null,
    isParentTask: false
  }
  tasks: Task[];
  projects: Project[];
  users: User[];
  parentTasks: Task[];
  projectName: string;
  isParentTask: boolean = false;
  parentTask: string;
  userName: string;
  modalRef: BsModalRef;
  constructor(private modalService: BsModalService, private sharedService: SharedService, private router: Router) { }

  ngOnInit() {
    const today = new Date();
    this.task.startDate = today;
    const tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
    this.task.endDate = tomorrow;
    this.task.priority = 0;
    this.GetAllTasks();
    this.GetAllParentTasks();
    this.GetAllProjects();
    this.GetAllUsers();
  }
  //Get All Tasks

  GetAllTasks(): void {
    this.sharedService.GetAllTasks().subscribe(
      data => {
        this.tasks = data;
      },
      (error) => { console.log(error); }
    );
  }
//Get All Parent Tasks
  GetAllParentTasks(): void {
    this.sharedService.GetAllParentTasks().subscribe(
      data => {
        this.parentTasks = data;
      },
      (error) => { console.log(error); }
    );
  }
//Get All Projects
  GetAllProjects(): void {
    this.sharedService.GetAllProjects().subscribe(
      data => {
        this.projects = data;
      },
      (error) => { console.log(error); }
    );
  }
//Get All Users
  GetAllUsers(): void {
    this.sharedService.GetAllUsers().subscribe(
      data => {
        this.users = data;
      },
      (error) => { console.log(error); }
    );
  }

  OpenModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  CloseModal() {
    this.modalRef.hide();
  }

  SelectedParent(task: Task): void {
    this.task.parentId = task.taskId;
    this.parentTask = task.taskName;
    this.CloseModal();
  }

  SelectedProject(project: Project): void {
    this.task.projectId = project.projectId;
    this.projectName = project.projectName;
    this.CloseModal();
  }

  SelectedUser(user: User): void {
    this.task.userId = user.userId;
    this.userName = user.firstName + ', ' + user.lastName;
    this.CloseModal();
  }

  AddTask() {
    if(!this.PerformValidations())
    {
      return;
    }
    this.task.taskId = 0;
    this.task.isParentTask = this.isParentTask;
    this.sharedService.AddTask(this.task).subscribe(data => {
      alert("Task added!");
      this.router.navigate(['/viewTask']);
    },
      (error) => { console.log(error); }
    );
  }

  PerformValidations(): boolean{
    if(!this.task.projectId)
    {
      alert("Tag the task to a Project");
      return false;
    }
    if((!this.task.taskName) || this.task.taskName.trim().length == 0)
    {
      alert("Enter Value in the Task Name");
      return false;
    }
    if(this.task.startDate >= this.task.endDate)
    {
      alert("End date should be greater than the start date");
      return false;
    }
    if(!this.task.userId)
    {
      alert("Tag the task to a User");
      return false;
    }  
    return true;
  }

  Reset(): void {
    this.task = {
      taskId: null,
      taskName: null,
      projectId: null,
      parentId: null,
      userId: null,
      parent: null,
      priority: null,
      startDate: null,
      endDate: null,
      isParentTask: false
    }
    this.projectName = '';
    this.isParentTask = false;
    this.parentTask = '';
    this.task.priority = 0;
  }

}
