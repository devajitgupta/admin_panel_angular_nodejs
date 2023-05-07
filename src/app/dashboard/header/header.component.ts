import { Component } from '@angular/core';
import { EmployeeService } from 'src/app/employee.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private api:EmployeeService
    ){} 
    logout() {
      return this.api.LogOut();
    }
    
    LoggedIn() {
    return !!localStorage.getItem("token");
  };
  
}
