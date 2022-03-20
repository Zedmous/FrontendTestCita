import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CitasService } from '../../../../core/services/citas.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Cita } from '../../../../core/interfaces/cita';
import * as _ from 'lodash';
import { PersonasService } from '../../../../core/services/personas.service';

@Component({
  selector: 'app-form-citas',
  templateUrl: './form-citas.component.html',
  styleUrls: ['./form-citas.component.css']
})
export class FormCitasComponent implements OnInit {
  title:string="";
  encPersona:boolean=false;
  cita: Partial<Cita> = {
    titulo: "",
    motivo: "",
    fecha: "",
    hora: "",
    persona_id:"",
    action:""
  }

  //@ViewChild('txtSearchPersona') txtSearchPersona!: ElementRef<HTMLInputElement>;// ! un operador paraasegurarse que no es nulo
  
  forms: FormGroup;
  constructor(
    private fb: FormBuilder,
    private citaService:CitasService,
    private personaService:PersonasService,
    private snackBar: MatSnackBar,
    private router:Router,
    private ref: MatDialogRef<FormCitasComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Partial<Cita>
  ) {
    this.cita = data;
    if(this.cita.action=="ver"){
      this.title="Ver";
      console.log(this.cita)
    }else if(this.cita.action=="editar"){
      this.title="Editar";
      this.encPersona=false;
    }else{
      this.title="Crear";
      this.encPersona=true;
    }
    this.forms = fb.group({
      titulo: [this.data? this.data.titulo : "", Validators.required],
      motivo: [this.data ? this.data.motivo : "", Validators.required],
      fecha: [this.data ? this.data.fecha : "",  [
        Validators.required
      ]],
      hora: [this.data ? this.data.hora : "", [
        Validators.required
      ]],
      persona_id: [this.data ? this.data.persona_id : "", Validators.required],
    })
  }

  ngOnInit(): void {

  }

  get titulo() {
    return this.forms.value.titulo;
  }
  get motivo() {
    return this.forms.value.motivo;
  }
  get fecha() {
    return this.forms.value.fecha;
  }
  get hora() {
    return this.forms.value.hora;
  }
  get persona_id() {
    return this.forms.value.persona_id;
  }
  save() {
    const value:Cita=this.forms.value;
    if (this.title=="Crear") {
      this.created(value);
    } else {
      this.updated(value);
    }
  }
  created(value:Cita){
    this.citaService.create(value).subscribe((res:any)=>{
      
      this.snackBar.open('Cita registrada exitosamente', '', {
        duration:1500,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
      this.ref.close(res.data);
    },(error)=>{

    })
  }
  updated(value:Cita) {
    this.citaService.update(this.cita.id, value).subscribe(
      (res:any) => {
        this.ref.close(_.merge(this.data, res.data));
      },
      (error) => {
        
      }
    );
  }

  searchPersona(){
    //const valor = this.txtSearchPersona.nativeElement.value;
    if(!this.persona_id){
      this.snackBar.open('Debes ingresar un id para buscar a una persona', '', {
        duration:1500,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
      return;
    }
    this.personaService.findOne(this.persona_id).subscribe((res)=>{
      this.snackBar.open('Persona encontrada exitosamente', '', {
        duration:1500,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
      this.encPersona=false;
    },(error)=>{
      if(error.status==404){
        this.encPersona=true;
        this.snackBar.open("Id de la persona no se encuentra registrada en el sistema", '', {
          duration:5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
      }
    })
  }
  removePersona(){
    this.encPersona=true;
    this.forms.setValue({
      titulo: this.titulo,
      motivo: this.motivo,
      fecha: this.fecha,
      hora: this.hora,
      persona_id: "",
    });
  }
}
