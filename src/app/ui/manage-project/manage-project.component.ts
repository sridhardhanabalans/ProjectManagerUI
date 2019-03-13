import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { Project } from 'src/app/models/project';
import { Task } from 'src/app/models/task';
import { User } from 'src/app/models/user';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-manage-project',
  templateUrl: './manage-project.component.html',
  styleUrls: ['./manage-project.component.css']
})
export class ManageProjectComponent implements OnInit {

  title: string = 'Add';
  isDatesIncluded: boolean = false;
  projectManager: string;
  filterProjectName: string;
  private _projectName: string;
  get projectName(): string {
    return this._projectName;
  }
  set projectName(value: string) {
    this._projectName = value;
    this.FilterProjects();
  }

  project: Project =
    {
      projectId: null,
      projectName: null,
      projectStartDate: null,
      projectEndDate: null,
      projectPriority: null,
      projectUserId: null,
      projectTotalTasks: null,
      projectTasksCompleted: null
    }

  projects: Project[];
  filteredProjects: Project[];
  users: User[];

  modalRef: BsModalRef;

  constructor(private modalService: BsModalService, private sharedService: SharedService) { }

  ngOnInit() {
    const today = new Date();
    this.project.projectStartDate = today;
    const tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
    this.project.projectEndDate = tomorrow;
    this.project.projectPriority = 0;
    this.GetAllProjects();
    this.GetAllUsers();
  }

  GetAllProjects(): void {
    this.sharedService.GetAllProjects().subscribe(
      data => {
        this.projects = data;
        this.filteredProjects = data;
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

  LoadUserName(): void {
    this.sharedService.GetAllUsers().subscribe(
      data => {
        this.users = data;
        this.projectManager = this.users.filter(m => m.userId == this.project.projectUserId)[0].firstName + ', ' + this.users.filter(m => m.userId == this.project.projectUserId)[0].lastName;
      },
      (error) => { console.log(error); }
    );
  }

  SortByStartDate(): void {
    this.filteredProjects = this.filteredProjects.sort(function (a, b) {
      if (a.projectStartDate >= b.projectStartDate)
        return 1;
      else
        return -1;
    });
  }

  SortByEndDate(): void {
    this.filteredProjects = this.filteredProjects.sort(function (a, b) {
      if (a.projectEndDate >= b.projectEndDate)
        return 1;
      else
        return -1;
    });
  }

  SortByPriority(): void {
    this.filteredProjects = this.filteredProjects.sort(function (a, b) {
      return (a.projectPriority - b.projectPriority)
    });
  }

  SortByCompleted(): void {
    this.filteredProjects = this.filteredProjects.sort(function (a, b) {
      if (a.projectEndDate >= b.projectEndDate)
        return -1;
      else
        return 1;
    });
  }

  FilterProjects(): void {
    this.filterProjectName = (this._projectName) ? this._projectName : "";
    this.filteredProjects = this.projects.filter(m =>
      m.projectName.toLowerCase().indexOf(this.filterProjectName.toLowerCase()) !== -1)
  }

  ProjectToUpdate(id: number): void {
    this.title = 'Update';
    this.project = this.projects.filter(m => m.projectId == id)[0];
    if (this.project.projectStartDate)
      this.isDatesIncluded = true;
    this.LoadUserName();
  }

  ManageProject() {
    if (!this.PerformValidations()) {
      return;
    }
    if (this.isDatesIncluded == false) {
      this.project.projectStartDate = null;
      this.project.projectEndDate = null;
    }
    if (this.title == 'Add') {
      this.project.projectId = 0;
      this.sharedService.AddProject(this.project).subscribe(data => { alert("Project added!"); this.Refresh(); },
        (error) => { console.log(error); }
      );
    }
    else {
      this.sharedService.UpdateProject(this.project).subscribe(data => { alert("Project updated!"); },
        (error) => { console.log(error); }
      );
    }
  }

  PerformValidations(): boolean {
    if ((!this.project.projectName) || this.project.projectName.trim().length == 0) {
      alert("Enter Value in the ProjectName");
      return false;
    }
    if (this.project.projectStartDate >= this.project.projectEndDate) {
      alert("End date should be greater than the start date");
      return false;
    }
    if (!this.project.projectUserId) {
      alert("Select a Project Manager");
      return false;
    }
    return true;
  }

  DeleteProject(id: number) {
    this.sharedService.DeleteProject(id).subscribe(data => {
      alert("Project is deleted!");
      this.Refresh();
    },
      (error) => { console.log(error); })
  }

  Refresh(): void {
    window.location.reload(true);
  }

  OpenModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  CloseModal() {
    this.modalRef.hide();
  }

  SelectedUser(user: User): void {
    this.project.projectUserId = user.userId;
    this.projectManager = user.firstName + ', ' + user.lastName;
    this.CloseModal();
  }

  Reset(): void {
    this.project =
      {
        projectId: null,
        projectName: null,
        projectStartDate: null,
        projectEndDate: null,
        projectPriority: null,
        projectUserId: null,
        projectTotalTasks: null,
        projectTasksCompleted: null
      }
    this.project.projectPriority = 0;
    this.isDatesIncluded = false;
    this.projectManager = '';
    this.projectName = '';
    this.title = 'Add';
  }

}
