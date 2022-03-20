import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AutGuard } from './core/guards/aut.guard';
import { LoginGuard } from './core/guards/login.guard';

const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},//si ingresa vacio
  {path:'login',component:LoginComponent,canActivate:[LoginGuard]},
  {path:'dashboard',loadChildren:()=>import('./pages/dashboard/dashboard.module').then(x=>x.DashboardModule),canActivate:[AutGuard]},//esto es carga perezoza
  {path:'**',redirectTo:'login',pathMatch:'full'}//si ingresa una direccion incorrecta
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
