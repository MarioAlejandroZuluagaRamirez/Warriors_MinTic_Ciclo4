import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SecurityService } from 'src/app/services/security.service';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  // adicion de validadores
  fgValidator: FormGroup = this.fb.group({
    'email': ['',[Validators.required,Validators.email]],
    'password': ['',[Validators.required]]
  });
  // adicion de FormBuilder al constructor: private fb: FormBuilder, private servicioSeguridad: SecurityService
  constructor(private fb: FormBuilder,
    private servicioSeguridad: SecurityService ) { }
  constructor() { }

  ngOnInit(): void {
  }

  // Agregar metodo para identificar usuario
  IdentificarUsuario(){
    let email = this.fgValidator.controls['email'].value;
    let password = this.fgValidator.controls['password'].value;
    this.servicioSeguridad.Identificar(email,password).subscribe((datos:any) => {
      //ok
      alert(datos.token)
    },(err: any) => {
      //ko
      alert("KO");
    }) 
  }
}
