import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent, children: [
      {path:'',component:HomeComponent},
      {path:'citas',loadChildren:()=>import('./citas/citas.module').then(x=>x.CitasModule)},//esto es carga perezoza
      {path:'personas',loadChildren:()=>import('./personas/personas.module').then(x=>x.PersonasModule)},//esto es carga perezoza
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
