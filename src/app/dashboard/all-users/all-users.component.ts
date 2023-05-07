import { Component } from '@angular/core';
import { registerEmployee } from 'src/app/registerEmployee';
import { ReactiveFormsModule } from '@angular/forms';
import { EmployeeService } from 'src/app/employee.service';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent {
  employee: registerEmployee[] = [];
  displayedColumns:string[]=['id','name','email','salary','designation'];
  dataSource!:MatTableDataSource<registerEmployee>;
  constructor(private router: Router, private api: EmployeeService) {
     
     this.getUsers();
    }
  

  logout() {
    return this.api.LogOut();
  }
  LoggedIn() {
    return !!localStorage.getItem("token");
  };
  

  getUsers() {
    console.log("get data")
    this.api.getUsers()
      .subscribe(data => {
        this.employee = data;
        console.log(this.employee)
      });
  }

}
