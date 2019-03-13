import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { ViewTaskComponent } from './ui/view-task/view-task.component';
import { AddTaskComponent } from './ui/add-task/add-task.component';
import { EditTaskComponent } from './ui/edit-task/edit-task.component';
import { ManageUserComponent } from './ui/manage-user/manage-user.component';
import { ManageProjectComponent } from './ui/manage-project/manage-project.component';
import { PageNotFoundComponent } from './ui/page-not-found/page-not-found.component';
import { UserModalComponent } from './ui/user-modal/user-modal.component';
import { ProjectModalComponent } from './ui/project-modal/project-modal.component';
import { TaskModalComponent } from './ui/task-modal/task-modal.component';

@NgModule({
  declarations: [
    AppComponent,
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
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
