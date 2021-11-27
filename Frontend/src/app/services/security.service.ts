import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModeloIdentificar } from '../models/identificar.modelo';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  // Agregar al constructor private http: HttpClient
  constructor(private http: HttpClient) { 

  }

  Identificar(email: string, password: string): Observable<ModeloIdentificar> {
    return this.http.post<ModeloIdentificar>("http://[::1]:3000/users/login",{
      email: email,
      password: password
    },{
      headers: new HttpHeaders({})
    })
  }
}
