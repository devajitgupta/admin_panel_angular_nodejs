import { Component } from '@angular/core';
import { Employee } from '../employee';
import { ReactiveFormsModule } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  regForm!: any
  Employee: Employee[] = [];
  isloggedin = false;
  //Login: Login[] = []




  constructor(private api: EmployeeService, private router: Router, public fb: FormBuilder) {
    this.mainForm();
  }
  mainForm() {
    this.regForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  ngOnInit() {
    this.mainForm();
  }

  userLogin(){
    console.log("user login");
    this.api.createLogin(this.regForm.value).subscribe(res=>{
      console.log(res)
      localStorage.setItem("token",res.token);
      this.router.navigate(['all-users'])
    })
  }


  onDelete() { }
  onEdit() { }

}
