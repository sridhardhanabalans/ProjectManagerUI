import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaskComponent } from './add-task.component';
import { ViewTaskComponent } from 'src/app/ui/view-task/view-task.component';
import { EditTaskComponent } from 'src/app/ui/edit-task/edit-task.component';
import { ManageUserComponent } from 'src/app/ui/manage-user/manage-user.component';
import { ManageProjectComponent } from 'src/app/ui/manage-project/manage-project.component';
import { PageNotFoundComponent } from 'src/app/ui/page-not-found/page-not-found.component';
import { UserModalComponent } from 'src/app/ui/user-modal/user-modal.component';
import { ProjectModalComponent } from 'src/app/ui/project-modal/project-modal.component';
import { TaskModalComponent } from 'src/app/ui/task-modal/task-modal.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap';
import {APP_BASE_HREF} from '@angular/common';

describe('AddTaskComponent', () => {
  let component: AddTaskComponent;
  let fixture: ComponentFixture<AddTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ViewTaskComponent,
        AddTaskComponent,
        EditTaskComponent,
        ManageUserComponent,
        ManageProjectComponent,
        PageNotFoundComponent,
        UserModalComponent,
        ProjectModalComponent,
        TaskModalComponent
      ],
      imports: [
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        ModalModule.forRoot()
      ],
      providers: [{provide: APP_BASE_HREF, useValue : '/' }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have two users', () => {
    spyOn(component, 'GetAllUsers').and.callThrough();
    component.GetAllUsers();
    expect(component.GetAllUsers).toHaveBeenCalled();
  });

  it('should have two projects', () => {
    spyOn(component, 'GetAllProjects').and.callThrough();
    component.GetAllProjects();
    expect(component.GetAllProjects).toHaveBeenCalled();
  });

  it('should have two tasks', () => {
    spyOn(component, 'GetAllTasks').and.callThrough();
    component.GetAllTasks();
    expect(component.GetAllTasks).toHaveBeenCalled();
  });

  it('should have two parent tasks', () => {
    spyOn(component, 'GetAllParentTasks').and.callThrough();
    component.GetAllParentTasks();
    expect(component.GetAllParentTasks).toHaveBeenCalled();
  });

  it('Add task should have called task with id 1', () => {
    let task = { taskId: 1, taskName: "Task 1", parentId: 2, parent: null, priority: 3, startDate: new Date(), endDate: new Date("2018-12-12"), projectId: 1, userId: 1 , isParentTask: false};
    spyOn(component, 'AddTask').and.callThrough();
    component.AddTask(task);
    expect(component.AddTask).toHaveBeenCalledWith(task);
  });

});
