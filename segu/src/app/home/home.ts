import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Api } from '../servicios/api';
import { NgModule } from '@angular/core';
import { AuthService } from '../sesiones/sesiones';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

  productos: any[]=[];

  constructor(private api:Api, private auth: AuthService, private router:Router){}

  ngOnInit():void{

    
    this.api.obtenerProductos().subscribe({
      next:(datos)=>{
        this.productos=datos as any[];
      },
      error:(err)=>{
        console.error("Error la obtener productos",err);
      }
    })
  }

  async irACarrito(){
    const isValid=await this.auth.checkTokenConHeader();
    if(isValid){
      this.router.navigate(['/carrito']);
    }else{
      alert('Inicia sesion');
      this.router.navigate(['/loguin']);
    }
  }


}
