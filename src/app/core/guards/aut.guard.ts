import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AutService } from '../services/aut.service';

@Injectable({
  providedIn: 'root'
})
export class AutGuard implements CanActivate {

  constructor(private autService: AutService,private router:Router) { }

  canActivate(): boolean {
    if (!this.autService.isAuth()) {
      console.log("El token no es valido o expiro")
      this.router.navigate(["/login"])
      return false;
    }
    return true;
  }

}
