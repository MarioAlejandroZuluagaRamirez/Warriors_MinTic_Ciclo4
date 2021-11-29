import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ModeloIdentificar } from '../models/identificar.modelo';
import { ModeloUser } from '../models/user.modelo';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  url = 'http://[::1]:3000'
  datosUsuarioEnSesion = new BehaviorSubject<ModeloIdentificar>(new ModeloIdentificar())
  token: string = '';
  // Agregar al constructor private http: HttpClient
  constructor(private http: HttpClient) { 
    this.VerificarSesionActual();
    this.token = this.ObtenerToken();
  }

  Identificar(email: string, password: string): Observable<ModeloIdentificar> {
    return this.http.post<ModeloIdentificar>(`${this.url}/users/login`,{
      email: email,
      password: password
    },{
      headers: new HttpHeaders({})
    })
  }

  RegistrarCliente(cliente: ModeloUser): Observable<ModeloUser> {
    return this.http.post<ModeloUser>(`${this.url}/signup`,cliente,{
      headers: new HttpHeaders({
        // 'Authorization': `Bearer ${this.token}`
      })
    })
  }

  AlmacenarSesion(datos: ModeloIdentificar){
    datos.identificado = true;
    let stringDatos = JSON.stringify(datos);
    localStorage.setItem("datosSesion",stringDatos);
    this.RefrescarDatosSesion(datos);
  }

  ObtenerToken(){
    let datosString = localStorage.getItem("datosSesion");
    if (datosString){
      let datos = JSON.parse(datosString);
      return datos.token;
    }else{
      return '';
    }
  }

  ObtenerInformacionSesion(){
    let datosString = localStorage.getItem("datosSesion");
    if (datosString){
      let datos = JSON.parse(datosString);
      return datos;
    }else{
      return '';
    }
  }

  EliminarInformacionSesion(){
    localStorage.removeItem("datosSesion");
    this.RefrescarDatosSesion(new ModeloIdentificar());
  }

  SesionIniciadad(){
    let datosString = localStorage.getItem("datosSesion");
    return datosString;
  }

  VerificarSesionActual(){
    let datos = this.ObtenerInformacionSesion();
    if (datos) {
      this.RefrescarDatosSesion(datos);
    }
  }

  RefrescarDatosSesion(datos: ModeloIdentificar){
    this.datosUsuarioEnSesion.next(datos);
  }

  ObtenerDatosUsuarioEnSesion(){
    return this.datosUsuarioEnSesion.asObservable();
  }

}
