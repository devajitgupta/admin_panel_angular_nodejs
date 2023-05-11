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
  regForm!: FormGroup;
  employee: registerEmployee[] = [];
  constructor(private router: Router, private api: EmployeeService, private fb: FormBuilder) {

    this.getUsers();
  }

  ngOnInit() {
    this.refreshEmployeeList();
    this.api.selectedEmployee = {
      id: "",
      name: '',
      email: '',
      salary: '',
      designation: '',
      role: ''
    }
  }
  refreshEmployeeList() {
    this.api.getUsers().subscribe((res) => {
      this.api.employees = res as registerEmployee[];
    });
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

  onEdit(emp: registerEmployee) {
    this.api.selectedEmployee = emp;
    console.log(emp)

  }
  onSubmit() {
    this.api.putEmployee(this.regForm.value).subscribe((res) => {
      console.log(res)
    })
  }


}
