import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPersonasComponent } from './list-personas/list-personas.component';
import { FormPersonasComponent } from './form-personas/form-personas.component';

const routes: Routes = [
  {
    path: '', component: ListPersonasComponent
  },
  {
    path: 'crear-persona', component: FormPersonasComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonasRoutingModule { }
