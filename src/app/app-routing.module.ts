import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { ThinkYeVisualisationComponent } from './components/think-ye-visualisation/think-ye-visualisation.component';
import { YourThoughtsComponent } from './components/your-thoughts/your-thoughts.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [LoginGuard] },
  { path: ':think-ye-id/visualisation', component: ThinkYeVisualisationComponent, canActivate: [LoginGuard] },
  { path: ':think-ye-id', component: YourThoughtsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
