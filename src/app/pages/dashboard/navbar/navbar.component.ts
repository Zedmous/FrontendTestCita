import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../../core/services/menu.service';
import { Menu } from '../../../core/interfaces/menu';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  menus:Menu[]=[];
  constructor(private menuService:MenuService) { }

  ngOnInit(): void {
    this.cargarMenu()
  }
  cargarMenu(){
    this.menuService.getMenu().subscribe((data:any)=>{
      this.menus=data;
    })
  }

}
