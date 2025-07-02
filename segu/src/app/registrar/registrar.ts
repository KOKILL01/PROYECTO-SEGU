import { Component } from '@angular/core';
import { Api } from '../servicios/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar',
  standalone: false,
  templateUrl: './registrar.html',
  styleUrl: './registrar.css'
})
export class Registrar {

nombre='';
correo='';
contra='';
rol='cliente';
sucursal='';

constructor(private api:Api, private router:Router){}

registrar(){
  this.api.registrarUsuario(this.nombre,this.contra,this.correo,this.rol,this.sucursal).subscribe({
    next:()=>{
      alert("Usuario registrado correctamente");
      this.router.navigate(['/loguin'])
    },
    error:err=>{
      alert("error al registrar:"+err.error?.error);
    }
  })
}

}
