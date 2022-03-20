import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListCitasComponent } from './list-citas/list-citas.component';

const routes: Routes = [
  {
    path: '', component: ListCitasComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CitasRoutingModule { }
