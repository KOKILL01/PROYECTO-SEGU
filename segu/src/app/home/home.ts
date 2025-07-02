import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Api } from '../servicios/api';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

  productos: any[]=[];

  constructor(private api:Api){}

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


}
