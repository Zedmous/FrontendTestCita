import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AutService } from '../services/aut.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private autService: AutService,private router:Router) { }

  canActivate(): boolean {
    if (this.autService.isAuth()) {
      console.log("El token es valido")
      this.router.navigate(["/dashboard"])
      return false;
    }
    return true;
  }
}
