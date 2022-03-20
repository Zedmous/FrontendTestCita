import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Cita } from '../interfaces/cita';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CitasService {
  private route:string="/citas";
  constructor(private http: HttpClient) {}
  //CREATE /citas
  create(cita: Partial<Cita>) {
    return this.http.post<Cita>(
      `${environment.apiUrl}${this.route}`,
      cita
    );
  }
  //UPDATE /citas/id
  update(id: any, cita: Partial<Cita>) {
    return this.http.patch<void>(
      `${environment.apiUrl}${this.route}/${id}`,
      cita
    );
  }
  //DELETE /citas/id
  delete(id: string) {
    return this.http.delete<void>(`${environment.apiUrl}${this.route}/${id}`);
  }
  //GET /citas
  getAll():Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}${this.route}`);
  }
}
