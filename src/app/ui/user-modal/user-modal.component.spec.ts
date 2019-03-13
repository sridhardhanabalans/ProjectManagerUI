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

describe('UserModalComponent', () => {
  let component: UserModalComponent;
  let fixture: ComponentFixture<UserModalComponent>;

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
    fixture = TestBed.createComponent(UserModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
