import { Component } from '@angular/core';
import { Api } from '../servicios/api';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-userempleado',
  imports:[FormsModule],
  templateUrl: './userempleado.html',
  styleUrl: './userempleado.css'
})
export class Userempleado {

  nombre='';
  correo='';
  contra='';
  rol='cliente';
  sucursal:string='';

  constructor(private api:Api, private router:Router){}

  subirEmpleado(){
    this.api.registrarUsuario(this.nombre,this.contra,this.correo,this.rol,this.sucursal).subscribe({
    next:()=>{
      alert("Usuario registrado correctamente");
      this.router.navigate(['/adminP'])
    },
    error:err=>{
      alert("error al registrar:"+err.error?.error);
    }
  })
  }

}
