import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterUserComponent } from './dashboard/register-user/register-user.component';
import { AllUsersComponent } from './dashboard/all-users/all-users.component';
import { AuthGuard } from './gaurd/auth.guard';
const routes: Routes = [
  {path:'', pathMatch:'full', redirectTo:'dashboard'},
  {path:'dashboard', component:DashboardComponent},
  {path:'register-user', component:RegisterUserComponent},
  {path:'all-users' ,canActivate: [AuthGuard], component:AllUsersComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
