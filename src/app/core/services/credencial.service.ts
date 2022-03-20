import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class CredencialService {

  private credencial: Partial<User> = {
    id: "",
    name: "",
    username: "",
  };
  constructor() {
    console.log("SE INSTANCIO CREDENTIAL.SERVICE")
  }

  public setUsers(credencial: User): void {
    sessionStorage.setItem('id', credencial.id);
    sessionStorage.setItem('name', credencial.name);
    sessionStorage.setItem('username', credencial.username);

    this.credencial = credencial;
    console.log("Guardando credenciales");
    console.log(this.credencial);
  }
  public getUsers(): Partial<User> {
    this.credencial = {
      id: "" + sessionStorage.getItem('id'),
      name: "" + sessionStorage.getItem('name'),
      username: "" + sessionStorage.getItem('username'),
    }
    console.log("Extrayendo credenciales");
    console.log(this.credencial);
    return this.credencial;
  }
  public removeUsers() {
    sessionStorage.clear();
    localStorage.clear();
    this.credencial = {
      id: "",
      name: "",
      username: "",
    }
  }
}
