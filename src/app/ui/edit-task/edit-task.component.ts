import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { Task } from 'src/app/models/task';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';
import { User } from 'src/app/models/user';
import { Project } from 'src/app/models/project';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {
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
  parentTasks: Task[];
  projectName: string;
  isParentTask: boolean;
  parentTask: string;
  userName: string;
  users: User[];
  projects: Project[];

  modalRef: BsModalRef;
  constructor(private modalService: BsModalService,private location: Location, private route: ActivatedRoute, private sharedService: SharedService, private router: Router) { }

  ngOnInit() {
    this.GetAllTasks();
    this.GetAllParentTasks();
    this.GetAllUsers();
  }
 
  getTask(): void {
    const id =+this.route.snapshot.paramMap.get('id');
    this.task = this.tasks.filter(m=> m.taskId == id)[0];
    this.GetAllProjects();
    this.LoadParentTask();
    this.LoadUserName();
  }

  GetAllProjects(): void {
    this.sharedService.GetAllProjects().subscribe(
      data => {
        this.projects = data;
        this.projectName = this.projects.filter(m=>m.projectId == this.task.projectId)[0].projectName;
      },
      (error) => { console.log(error); }
    );
  }

  GetAllTasks(): void {
    this.sharedService.GetAllTasks().subscribe(
      data => {
        this.tasks = data;
        this.getTask();
      },
      (error) => { console.log(error); }
    );
  }

  LoadParentTask(): void {
    this.sharedService.GetAllParentTasks().subscribe(
      data => {
        this.parentTasks = data;
        if(this.task.parentId)
        this.parentTask = this.parentTasks.filter(m=> m.taskId == this.task.parentId)[0].taskName;
      },
      (error) => { console.log(error); }
    );
  }

  LoadUserName(): void {
    this.sharedService.GetAllUsers().subscribe(
      data => {
        this.users = data;
        this.task.userId = this.users.filter(m=> m.taskId == this.task.taskId)[0].userId;
        this.userName = this.users.filter(m=> m.taskId == this.task.taskId)[0].firstName + ', '
        +this.users.filter(m=> m.taskId == this.task.taskId)[0].lastName;
      },
      (error) => { console.log(error); }
    );
  }

  GetAllParentTasks(): void {
    this.sharedService.GetAllParentTasks().subscribe(
      data => {
        this.parentTasks = data;
      },
      (error) => { console.log(error); }
    );
  }

  GetAllUsers(): void {
    this.sharedService.GetAllUsers().subscribe(
      data => {
        this.users = data;
      },
      (error) => { console.log(error); }
    );
  }

  UpdateTask(): void {
    if(!this.PerformValidations())
    {
      return;
    }
    this.sharedService.UpdateTask(this.task).subscribe(
      data=> {alert("Task updated!"); 
      this.router.navigate(['/viewTask']);},
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

  SelectedUser(user: User): void{
    this.task.userId = user.userId;
    this.userName= user.firstName + ', ' + user.lastName;
    this.CloseModal();
  }

  Cancel(): void {
    this.location.back();
  }

}
