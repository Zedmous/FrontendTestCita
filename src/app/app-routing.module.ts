import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},//si ingresa vacio
  {path:'login',component:LoginComponent},
  {path:'dashboard',loadChildren:()=>import('./pages/dashboard/dashboard.module').then(x=>x.DashboardModule)},//esto es carga perezoza
  {path:'**',redirectTo:'login',pathMatch:'full'}//si ingresa una direccion incorrecta
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
