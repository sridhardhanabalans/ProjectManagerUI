import { Component, OnInit , Input, EventEmitter, Output} from '@angular/core';
import { Project } from 'src/app/models/project';

@Component({
  selector: 'app-project-modal',
  templateUrl: './project-modal.component.html',
  styleUrls: ['./project-modal.component.css']
})
export class ProjectModalComponent implements OnInit {

  @Input() projects: Project[];
  @Output() selectedProj: EventEmitter<Project> = new EventEmitter();
  filteredProjects: Project[];
  selectedProject: Project;

  filterProjectName: string;
  private _projectName: string;
  get projectName(): string {
    return this._projectName;
  }
  set projectName(value: string) {
    this._projectName = value;
    this.FilterTasks();
  }

  constructor() { }

  ngOnInit() {
    this.filteredProjects = this.projects;
  }

  FilterTasks(): void{
    this.filterProjectName = (this._projectName) ? this._projectName : "";
    this.filteredProjects = this.projects.filter(m =>
      m.projectName.toLowerCase().indexOf(this.filterProjectName.toLowerCase()) !== -1)
  }

  SelectProject():void{
    this.selectedProj.next(this.selectedProject);
  }

}
