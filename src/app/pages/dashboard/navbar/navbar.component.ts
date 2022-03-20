import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../../core/services/menu.service';
import { Menu } from '../../../core/interfaces/menu';
import { CredencialService } from '../../../core/services/credencial.service';
import { Router } from '@angular/router';
import { AutService } from '../../../core/services/aut.service';
import { User } from '../../../core/interfaces/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  menus:Menu[]=[];
  constructor(private menuService:MenuService,private credencialService:CredencialService,private router:Router,private autService:AutService) { }

  ngOnInit(): void {
    this.cargarMenu()
  }
  cargarMenu(){
    this.menuService.getMenu().subscribe((data:any)=>{
      this.menus=data;
    })
  }

  logout() {
    let valor:Partial<User>={

    };
    this.autService.logout(valor).subscribe((res:any)=>{
      this.credencialService.removeUsers()
      this.router.navigate(['/login']);
      console.log("Session cerrada eliminando token");
    })
    
  }

}
