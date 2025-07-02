import { Component } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { Api } from '../servicios/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detalles',
  standalone: false,
  templateUrl: './detalles.html',
  styleUrl: './detalles.css'
})
export class Detalles {

  producto: any;
  tienda:any
  comentarios: any[]=[];
  coment='';
  constructor(private ruta: ActivatedRoute, private api: Api, private router:Router) {}

  ngOnInit() {
    const id = this.ruta.snapshot.paramMap.get('id');
    if (id) {
      this.api.obtenerProductoPorId(id).subscribe((data:any)=>{
        this.producto=data.productoo;
        this.tienda=data.tiendas;
      });


      this.api.obtenerComentario(id).subscribe(datas=>{
        this.comentarios=datas as any[];
      });
    }
  }

  subir(){
    this.api.subircomentario(this.coment,this.producto.id).subscribe({
      next:()=>{
        alert('Comentario publicado');
        this.coment='';
      },
      error:err=>{
        alert('Error al publicar'+err.error?.error);
      }
    })
  }


  anadirCarrito(){
    const productoCarrito = {
    id: this.producto.id,
    nombre: this.producto.nombre,
    precio: this.producto.precio,
    tiendas: this.tienda, // <- aquí ya guardamos TODAS las tiendas
    tiendaSeleccionada: '' // para que luego el usuario la elija
    };
    let carrito: any[] = JSON.parse(localStorage.getItem('carrito') || '[]');
    carrito.push(productoCarrito);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    
    alert('Producto añadido al carrito');
  }
  

}
