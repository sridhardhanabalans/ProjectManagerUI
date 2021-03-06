import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { Task } from 'src/app/models/task';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';
import { Project } from 'src/app/models/project';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {

  tasks: Task[];
  filteredTasks: Task[];
  projectName: string;
  currentDate: Date;
  projects: Project[];
  modalRef: BsModalRef;

  constructor(private router: Router, private sharedService: SharedService, private modalService: BsModalService) { }

  ngOnInit() {
    this.currentDate = new Date();
    this.GetAllTasks();
    this.GetAllProjects();
  }

//Get All Tasks Method
  GetAllTasks(): void {
    this.sharedService.GetAllTasks().subscribe(
      data => {
        this.tasks = data;
        this.filteredTasks = data;
      },
      (error) => { console.log(error); }
    );
  }
//Get All Projects Method
  GetAllProjects(): void {
    this.sharedService.GetAllProjects().subscribe(
      data => {
        this.projects = data;
      },
      (error) => { console.log(error); }
    );
  }
//End Task Method
  EndTask(task: Task) {
    task.endDate = new Date();
    this.sharedService.UpdateTask(task).subscribe(data => {
      alert("Task ended!");
      this.Refresh();
    },
      (error) => { console.log(error); }
    )
  }
//Delete Task Method
  DeleteTask(id: number) {
    this.sharedService.DeleteTask(id).subscribe(data => {
      alert("Task is deleted!");
      this.Refresh();
    },
      (error) => { console.log(error); })
  }

  OpenModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  CloseModal() {
    this.modalRef.hide();
  }

  Refresh(): void {
    window.location.reload(true);
  }
//Selected Project Method
  SelectedProject(project: Project): void {
    this.projectName = project.projectName;
    this.filteredTasks = this.tasks.filter(m => m.projectId == project.projectId);
    this.CloseModal();
  }
//Sort by start date Method
  SortByStartDate(): void {
    this.filteredTasks = this.filteredTasks.sort(function (a, b) {
      if (a.startDate >= b.startDate)
        return 1;
      else
        return -1;
    });
  }
//Sort by end date Method
  SortByEndDate(): void {
    this.filteredTasks = this.filteredTasks.sort(function (a, b) {
      if (a.endDate >= b.endDate)
        return 1;
      else
        return -1;
    });
  }
//Sort by Priority Method

  SortByPriority(): void {
    this.filteredTasks = this.filteredTasks.sort(function (a, b) {
      return (a.priority - b.priority)
    });
  }
//Sort by Completed Method

  SortByCompleted(): void {
    this.filteredTasks = this.filteredTasks.sort(function (a, b) {
      if (a.endDate >= b.endDate)
        return -1;
      else
        return 1;
    });
  }
//Route to Edit Task

  RouteToEditTask(id: number) {
    this.router.navigate(['/editTask', id])
  }

}
