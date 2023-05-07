import { Injectable } from '@angular/core';
import { Employee } from './employee';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { registerEmployee } from './registerEmployee';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  

  url = 'http://localhost:3000/';
  loginUrl = 'http://localhost:3000/login'
  TOKEN_KEY = 'auth-token';
  USER_KEY = 'auth-user';

  private httpOptions = {
    headers: new HttpHeaders()
      .set("content-Type", "application/json")
  };


  constructor(private http: HttpClient, private router: Router) { }


  //--- register employee
  createEmployee(emp: any) {
    return this.http.post<any>
      (this.url + 'register', emp, this.httpOptions);
  }
  getUsers(): Observable<registerEmployee[]> {
    return this.http.get<registerEmployee[]>(this.url);
  }

  // -- add a employee
  AddUsers(employee:any){
    return this.http.post<any>
    (this.url +'employees',employee,this.httpOptions)
  }

  createLogin(emp: any) {
    return this.http.post<any>
      (this.url + 'login', emp, this.httpOptions);
  }

  LoggedIn() {
    return !!localStorage.getItem("token");
  };
  LogOut() {
    localStorage.removeItem("token");
    this.router.navigate(["/dashboard"])
  }
  logout() {
    window.sessionStorage.clear();
  }

}
