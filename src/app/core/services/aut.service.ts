import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
@Injectable({
  providedIn: 'root'
})
export class AutService {
  private route:string="/auth";
  constructor(
    private http: HttpClient,
    //private jwthelperService:JwtHelperService
    ) {
      console.log("SE INSTANCIO AUTH.SERVICE")
    }


  login(request: Partial<User> ): Observable<any> {
    console.log("Enviando credenciales");
    console.log(request);
    return this.http.post<any>(`${environment.apiUrl}${this.route}/login`, request);
  }
  logout(request: Partial<User> ): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}${this.route}/logout`, request);
  }
  /*
  isAuth():boolean{
    const token:any= localStorage.getItem('token');
    if(this.jwthelperService.isTokenExpired(token)  || !localStorage.getItem('token')){
      return false;
    }
    return true;
  }*/
}
