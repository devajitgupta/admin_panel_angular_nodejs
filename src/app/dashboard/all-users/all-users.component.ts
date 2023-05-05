import { Component } from '@angular/core';
import { Employee } from 'src/app/employee';
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
  user: Employee[] = [];
  displayedColumns:string[]=['id','role','name','email'];
  dataSource!:MatTableDataSource<Employee>;
  constructor(private router: Router, private api: EmployeeService) {
     
     this.getUsers();
    }
  

  logout() {
    return this.api.LogOut();
  }

  getUsers() {
    console.log("get data")
    this.api.getUsers()
      .subscribe(data => {
        this.user = data;
        console.log(this.user)
      });
  }

}
