import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaskComponent } from 'src/app/ui/add-task/add-task.component';
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
import { APP_BASE_HREF } from '@angular/common';

describe('ViewTaskComponent', () => {
  let component: ViewTaskComponent;
  let fixture: ComponentFixture<ViewTaskComponent>;

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
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have two tasks', () => {
    spyOn(component, 'GetAllTasks').and.callThrough();
    component.GetAllTasks();
    expect(component.GetAllTasks).toHaveBeenCalled();
  });

  it('should have two projects', () => {
    spyOn(component, 'GetAllProjects').and.callThrough();
    component.GetAllProjects();
    expect(component.GetAllProjects).toHaveBeenCalled();
  });

  it('EndTask should have called task with id 1', () => {
    let task = { taskId: 1, taskName: "Task 1", parentId: 2, parent: null, priority: 3, startDate: new Date(), endDate: new Date("2018-12-12"), projectId: 1, userId: 1, isParentTask: false };
    spyOn(component, 'EndTask').and.callThrough();
    component.EndTask(task);
    expect(component.EndTask).toHaveBeenCalledWith(task);
  });

  it('DeleteTask should have been called with id 1', () => {
    spyOn(component, 'DeleteTask').and.callThrough();
    component.DeleteTask(1)
    expect(component.DeleteTask).toHaveBeenCalledWith(1);
  });

});
