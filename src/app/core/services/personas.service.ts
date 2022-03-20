import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { Persona } from '../interfaces/persona';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonasService {
  private route:string="/personas";
  constructor(private http: HttpClient) {}
  //CREATE /personas
  create(persona: Partial<Persona>) {
    return this.http.post<Persona>(
      `${environment.apiUrl}${this.route}`,
      persona
    );
  }
  //UPDATE /personas/id
  update(id: any, persona: Partial<Persona>) {
    return this.http.patch<void>(
      `${environment.apiUrl}${this.route}/${id}`,
      persona
    );
  }
  //DELETE /personas/id
  delete(id: string) {
    return this.http.delete<void>(`${environment.apiUrl}${this.route}/${id}`);
  }
  //GET /personas
  getAll():Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}${this.route}`);
  }

  findOne(id: string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}${this.route}/${id}`);
  }
}
