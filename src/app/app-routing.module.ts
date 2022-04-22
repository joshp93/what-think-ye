import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompletedComponent } from './components/completed/completed.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ThinkYeVisualisationComponent } from './components/think-ye-visualisation/think-ye-visualisation.component';
import { YourThoughtsComponent } from './components/your-thoughts/your-thoughts.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [LoginGuard] },
  { path: 'success', component: CompletedComponent },
  { path: ':think-ye-id/visualisation', component: ThinkYeVisualisationComponent, canActivate: [LoginGuard] },
  { path: ':think-ye-id', component: YourThoughtsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
