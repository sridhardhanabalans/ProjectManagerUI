import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AddTaskComponent } from 'src/app/ui/add-task/add-task.component';
import { EditTaskComponent } from 'src/app/ui/edit-task/edit-task.component';
import { ViewTaskComponent } from 'src/app/ui/view-task/view-task.component';
import { PageNotFoundComponent } from 'src/app/ui/page-not-found/page-not-found.component';
import { ManageUserComponent } from 'src/app/ui/manage-user/manage-user.component';
import { ManageProjectComponent } from 'src/app/ui/manage-project/manage-project.component';

export const routes: Routes = [
  { path: '', redirectTo: '/viewTask', pathMatch: 'full' },
  { path: 'addTask', component: AddTaskComponent },
  { path: 'editTask/:id', component: EditTaskComponent },
  { path: 'viewTask', component: ViewTaskComponent },
  { path: 'manageUser', component: ManageUserComponent },
  { path: 'manageProject', component: ManageProjectComponent },
  { path : '**', component: PageNotFoundComponent}
];
 
@NgModule({
  imports: [ 
    CommonModule,
    RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
