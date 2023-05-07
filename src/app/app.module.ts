import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule,Routes } from '@angular/router';
import { MaterialModules } from './material.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterUserComponent } from './dashboard/register-user/register-user.component';
import { AllUsersComponent } from './dashboard/all-users/all-users.component';
import { HeaderComponent } from './dashboard/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import { RegisterEmployeeComponent } from './dashboard/register-employee/register-employee.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,RegisterUserComponent, AllUsersComponent, HeaderComponent, RegisterEmployeeComponent
    
  ],
  imports: [ReactiveFormsModule,RouterModule,FormsModule,
    BrowserModule,HttpClientModule,MatCardModule,
    AppRoutingModule,MaterialModules, BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
