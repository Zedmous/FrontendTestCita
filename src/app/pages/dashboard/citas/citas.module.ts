import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListCitasComponent } from './list-citas/list-citas.component';
import { FormCitasComponent } from './form-citas/form-citas.component';
import { CitasRoutingModule } from './citas-routing.module';
import { SharedModule } from '../../../shared/shared.module';



@NgModule({
  declarations: [
    ListCitasComponent,
    FormCitasComponent
  ],
  imports: [
    CommonModule,
    CitasRoutingModule,
    SharedModule
  ],
  exports:[
    ListCitasComponent
  ]
})
export class CitasModule { }
