import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterUserComponent } from './dashboard/register-user/register-user.component';
import { AllUsersComponent } from './dashboard/all-users/all-users.component';
import { AuthGuard } from './gaurd/auth.guard';
import { RegisterEmployeeComponent } from './dashboard/register-employee/register-employee.component';
const routes: Routes = [
  {path:'', pathMatch:'full', redirectTo:'dashboard'},
  {path:'dashboard', component:DashboardComponent},
  {path:'register-user', component:RegisterUserComponent},
  {path:'all-users' ,canActivate: [AuthGuard], component:AllUsersComponent},
  {path:'login' , component:DashboardComponent},
  {path:'register-employee',component:RegisterEmployeeComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
