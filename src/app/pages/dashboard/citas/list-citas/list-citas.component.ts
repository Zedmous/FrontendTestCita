import { Component, OnInit, ViewChild } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { FormCitasComponent } from '../form-citas/form-citas.component';
import { Cita } from '../../../../core/interfaces/cita';
import { CitasService } from '../../../../core/services/citas.service';

@Component({
  selector: 'app-list-citas',
  templateUrl: './list-citas.component.html',
  styleUrls: ['./list-citas.component.css']
})
export class ListCitasComponent implements OnInit {
  loading:boolean=false;
  citas:Cita[]=[];
  displayedColumns: string[] = ['titulo', 'motivo', 'fecha','persona','operaciones'];
  dataSource = new MatTableDataSource(this.citas);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  
  constructor(
    private citasService:CitasService,
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
    this.citasService.getAll().subscribe((res)=>{
      this.loading=false;
      this.dataSource= new MatTableDataSource(res.data);
    },(error)=>{
      this.loading=false;
    })
  }
  eliminar(element:Cita,i:number){
    this.citasService.delete(element.id).subscribe((data)=>{
      let citas=this.dataSource.data;
      citas.splice(i,1);
      this.dataSource.data=citas;
      //this.getAll();
      this.snackBar.open('Cita eliminada exitosamente', '', {
        duration:1500,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
    },(error)=>{
      console.log("Cita no eliminada error",element,error)
    })
  }

  async ver(cita: Cita) {
    cita.action="ver";
    const addedData = await this.dialog
      .open(FormCitasComponent, {
        width: "600px",
        height: '550px',
        disableClose: true,
        data: cita
      })
      .afterClosed()
      .toPromise();
  }
  async add() {
    let cita: Partial<Cita>={
      
    }
    const addedData = await this.dialog
      .open(FormCitasComponent, {
        width: "600px",
        height: '550px',
        disableClose: true,
        data: cita
      })
      .afterClosed()
      .toPromise();

    if (!addedData) return;

    this.dataSource.data = [addedData, ...this.dataSource.data];
    //this.ui.showSnackNotification({ messageId: "NOTIFICATIONS.ADDED" });
  }

  
  async edit(cita: Cita) {
    cita.action="editar";
    const updatedData = await this.dialog
      .open(FormCitasComponent, {
        width: "600px",
        height: '550px',
        disableClose: true,
        data: cita,
      })
      .afterClosed()
      .toPromise();

    if (!updatedData) return;

    const list = this.dataSource.data;
    const itemIndex = list.findIndex((i) => i.id === cita.id);
    list[itemIndex] = updatedData;
    this.dataSource.data = list;
  }

}
