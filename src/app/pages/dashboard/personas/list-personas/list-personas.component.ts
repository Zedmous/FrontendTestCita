import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Persona } from '../../../../core/interfaces/persona';
import { PersonasService } from '../../../../core/services/personas.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { FormPersonasComponent } from '../form-personas/form-personas.component';







@Component({
  selector: 'app-list-personas',
  templateUrl: './list-personas.component.html',
  styleUrls: ['./list-personas.component.css']
})
export class ListPersonasComponent implements OnInit {
  loading:boolean=false;
  personas:Persona[]=[];
  displayedColumns: string[] = ['nombre', 'apellido', 'telefono','descripcion' ,'operaciones'];
  dataSource = new MatTableDataSource(this.personas);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  
  constructor(
    private personasService:PersonasService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    ) { }

  ngOnInit(): void {
    this.getAll()
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  getAll(){
    this.loading=true;
    this.personasService.getAll().subscribe((res)=>{
      this.loading=false;
      this.dataSource= new MatTableDataSource(res.data);
    },(error)=>{
      this.loading=false;
    })
  }
  eliminar(element:Persona,i:number){
    this.personasService.delete(element.id).subscribe((data)=>{
      let personas=this.dataSource.data;
      personas.splice(i,1);
      this.dataSource.data=personas;
      //this.getAll();
      this.snackBar.open('Persona eliminada exitosamente', '', {
        duration:1500,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
    },(error)=>{
      if(error.status==422){
        this.snackBar.open(error.error.error, '', {
          duration:5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
      }
    })
  }

  async ver(persona: Persona) {
    persona.action="ver";
    const addedData = await this.dialog
      .open(FormPersonasComponent, {
        width: "600px",
        height: '500px',
        disableClose: true,
        data: persona
      })
      .afterClosed()
      .toPromise();

    /*if (!addedData) return;

    this.dataSource.data = [addedData, ...this.dataSource.data];*/
    //this.ui.showSnackNotification({ messageId: "NOTIFICATIONS.ADDED" });
  }
  async add() {
    let persona: Partial<Persona>={
      
    }
    const addedData = await this.dialog
      .open(FormPersonasComponent, {
        width: "600px",
        height: '500px',
        disableClose: true,
        data: persona
      })
      .afterClosed()
      .toPromise();

    if (!addedData) return;

    this.dataSource.data = [addedData, ...this.dataSource.data];
    //this.ui.showSnackNotification({ messageId: "NOTIFICATIONS.ADDED" });
  }

  
  async edit(persona: Persona) {
    persona.action="editar";
    const updatedData = await this.dialog
      .open(FormPersonasComponent, {
        width: "600px",
        height: '500px',
        disableClose: true,
        data: persona,
      })
      .afterClosed()
      .toPromise();

    if (!updatedData) return;

    const list = this.dataSource.data;
    const itemIndex = list.findIndex((i) => i.id === persona.id);
    list[itemIndex] = updatedData;
    this.dataSource.data = list;
  }

}
