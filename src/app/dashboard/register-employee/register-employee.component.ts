import { Component } from '@angular/core';
import { registerEmployee } from 'src/app/registerEmployee';
import { ReactiveFormsModule } from '@angular/forms';
import { EmployeeService } from 'src/app/employee.service'; 
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-employee',
  templateUrl: './register-employee.component.html',
  styleUrls: ['./register-employee.component.css']
})
export class RegisterEmployeeComponent {
  regForm!:FormGroup;
  emp: registerEmployee[] = [];
  roles = [
    {  name: "admin" },
    {  name: "manager" },
    {  name: "employee" }
  ];



  

  constructor(private api:EmployeeService,private router:Router,public fb: FormBuilder){
    this.mainForm();
  }
  mainForm(){
    this.regForm=this.fb.group({
      name:['',[Validators.required]],
      email:['',[Validators.required]],
      salary:['',[Validators.required]],
      designation:['',[Validators.required]],
      role:['',[Validators.required]]


    })
  }

  onSubmit(){
    console.log("Submit ")
    if(this.regForm.valid){
      this.api.AddUsers(this.regForm.value).subscribe(res=>{
        console.log(res);
        this.regForm.reset();
        this.router.navigate(["/all-users"])
      })
    }
    
  }


}
