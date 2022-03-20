import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListPersonasComponent } from './list-personas/list-personas.component';
import { FormPersonasComponent } from './form-personas/form-personas.component';
import { PersonasRoutingModule } from './personas-routing.module';
import { SharedModule } from '../../../shared/shared.module';



@NgModule({
  declarations: [
    ListPersonasComponent,
    FormPersonasComponent
  ],
  imports: [
    CommonModule,
    PersonasRoutingModule,
    SharedModule
  ],
  exports:[
    ListPersonasComponent
  ]
})
export class PersonasModule { }
