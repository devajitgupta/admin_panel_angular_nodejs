import { Component } from '@angular/core';
import { Employee } from 'src/app/employee';
import { ReactiveFormsModule } from '@angular/forms';
import { EmployeeService } from 'src/app/employee.service'; 
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent {
  regForm!:FormGroup;
  Employee: Employee[] = [];



  

  constructor(private api:EmployeeService,private router:Router,public fb: FormBuilder){
    this.mainForm();
  }
  mainForm(){
    this.regForm=this.fb.group({
      name:['',[Validators.required]],
      email:['',[Validators.required]],
      password:['',[Validators.required]]
    })
  }

  onSubmit(){
    console.log("Submit ")

    if(this.regForm.valid){
      this.api.createEmployee(this.regForm.value).subscribe(res=>{
        console.log(res);
        this.regForm.reset();
        this.router.navigate(["/all-users"])
      })
    }
    
  }

}
