import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/user';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css']
})
export class ManageUserComponent implements OnInit {

  title: string = 'Add';
  user: User =
    {
      userId: null,
      firstName: null,
      lastName: null,
      employeeId: null,
      projectId: null,
      taskId: null
    }

  users: User[];
  filteredUsers: User[];
  filterUserName: string;
  private _userName: string;
  get userName(): string {
    return this._userName;
  }
  set userName(value: string) {
    this._userName = value;
    this.FilterUsers();
  }

  constructor(private sharedService: SharedService) { }

  ngOnInit() {
    this.GetAllUsers();
  }
//Get All Users Method
  GetAllUsers(): void {
    this.sharedService.GetAllUsers().subscribe(
      data => {
        this.users = data;
        this.filteredUsers = data;
      },
      (error) => { console.log(error); }
    );
  }
//Manage User Method
  ManagerUser() {
    if(!this.PerformValidations())
    {
      return;
    }
    if (this.title == 'Add') {
      this.user.userId =0;
      this.sharedService.AddUser(this.user).subscribe(data => { alert("User added!"); this.Refresh();},
      (error) => { console.log(error); }
      );
    }
    else {
      this.sharedService.UpdateUser(this.user).subscribe(data => { alert("User updated!"); },
      (error) => { console.log(error); }
      );
    }
  }
// Validation Method
  PerformValidations(): boolean{
    if((!this.user.firstName) || this.user.firstName.trim().length == 0)
    {
      alert("Enter Value in the First Name");
      return false;
    }
    if((!this.user.lastName) || this.user.lastName.trim().length == 0)
    {
      alert("Enter Value in the Last Name");
      return false;
    }
    if((!this.user.employeeId) || this.user.employeeId == 0)
    {
      alert("Enter Valid Value in the Employee Id");
      return false;
    }
    return true;
  }
 //Delete User Method
  DeleteUser(id: number) {
    this.sharedService.DeleteUser(id).subscribe(data => {
      alert("User is deleted!");
      this.Refresh();
    },
      (error) => { console.log(error); })
  }

  Refresh(): void {
    window.location.reload(true);
  }

  SortByFirstName(): void {
    this.filteredUsers = this.filteredUsers.sort(function (a, b) {
      if (a.firstName >= b.firstName)
        return 1;
      else
        return -1;
    });
  }

  SortByLastName(): void {
    this.filteredUsers = this.filteredUsers.sort(function (a, b) {
      if (a.lastName >= b.lastName)
        return 1;
      else
        return -1;
    });
  }

  SortById(): void {
    this.filteredUsers = this.filteredUsers.sort(function (a, b) {
      return (a.employeeId - b.employeeId)
    });
  }
//Filter Users
  FilterUsers(): void {
    this.filterUserName = (this._userName) ? this._userName : "";
    this.filteredUsers = this.users.filter(m =>
      m.firstName.toLowerCase().indexOf(this.filterUserName.toLowerCase()) !== -1 ||
      m.lastName.toLowerCase().indexOf(this.filterUserName.toLowerCase()) !== -1)
  }

  UserToUpdate(id: number): void {
    this.title = 'Update';
    this.user = this.users.filter(m => m.userId == id)[0];
  }

  Reset(): void {
    this.user =
      {
        userId: null,
        firstName: null,
        lastName: null,
        employeeId: null,
        projectId: null,
        taskId: null
      }
    this.title = 'Add';
  }
}
