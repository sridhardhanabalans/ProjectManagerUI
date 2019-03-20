import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.css']
})
export class UserModalComponent implements OnInit {

  @Input() users: User[];
  @Output() selectedPerson: EventEmitter<User> = new EventEmitter();
  filteredUsers: User[];
  selectedUser: User;

  filterUserName: string;
  private _userName: string;
  get userName(): string {
    return this._userName;
  }
  set userName(value: string) {
    this._userName = value;
    this.FilterTasks();
  }

  constructor() { }

  ngOnInit() {
    this.filteredUsers = this.users;
  }
//Filter Tasks Method
  FilterTasks(): void{
    this.filterUserName = (this._userName) ? this._userName : "";
    this.filteredUsers = this.users.filter(m =>
      m.firstName.toLowerCase().indexOf(this.filterUserName.toLowerCase()) !== -1 ||
      m.lastName.toLowerCase().indexOf(this.filterUserName.toLowerCase()) !== -1)
  }
//Select User Method
  SelectUser():void{
    this.selectedPerson.next(this.selectedUser);
  }

}
