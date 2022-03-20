import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Persona } from '../../../../core/interfaces/persona';
import { PersonasService } from '../../../../core/services/personas.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as _ from "lodash";
@Component({
  selector: 'app-form-personas',
  templateUrl: './form-personas.component.html',
  styleUrls: ['./form-personas.component.css']
})
export class FormPersonasComponent implements OnInit {
  title:string="";
  persona: Partial<Persona> = {
    nombre: "",
    apellido: "",
    telefono: "",
    descripcion: ""
  }

  forms: FormGroup;
  constructor(
    private fb: FormBuilder,
    private personaService:PersonasService,
    private snackBar: MatSnackBar,
    private router:Router,
    private ref: MatDialogRef<FormPersonasComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Partial<Persona>
  ) {
    this.persona = data;
    if(this.persona.action=="ver"){
      this.title="Ver";
    }else if(this.persona.action=="editar"){
      this.title="Editar";
    }else{
      this.title="Crear";
      this.persona.action="";
    }
    this.forms = fb.group({
      nombre: [this.data? this.data.nombre : "", Validators.required],
      apellido: [this.data ? this.data.apellido : "", Validators.required],
      telefono: [this.data ? this.data.telefono : "",  [
        Validators.minLength(8)
      ]],
      descripcion: [this.data ? this.data.descripcion : "", [
        Validators.minLength(10)
      ]]
    })
  }

  ngOnInit(): void {

  }

  get nombre() {
    return this.forms.value.nombre;
  }
  get apellido() {
    return this.forms.value.apellido;
  }
  get telefono() {
    return this.forms.value.telefono;
  }
  get descripcion() {
    return this.forms.value.descripcion;
  }
  save() {
    const value:Persona=this.forms.value;
    if (!this.persona) {
      this.created(value);
    } else {
      this.updated(value);
    }
  }
  created(value:Persona){
    this.personaService.create(value).subscribe((res:any)=>{
      
      this.snackBar.open('Persona registrada exitosamente', '', {
        duration:1500,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
      this.ref.close(res.data);
    },(error)=>{

    })
  }
  updated(value:Persona) {
    this.personaService.update(this.persona.id, value).subscribe(
      (res:any) => {
        this.ref.close(_.merge(this.data, res.data));
      },
      (error) => {

      }
    );
  }

}
