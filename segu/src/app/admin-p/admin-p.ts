import { Component } from '@angular/core';
import { Api } from '../servicios/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-p',
  standalone: false,
  templateUrl: './admin-p.html',
  styleUrl: './admin-p.css'
})
export class AdminP {
productos: any[] = [];

  constructor(private api: Api, private router:Router) {}

  ngOnInit(): void {
    this.api.obtenerProductos().subscribe({
      next: (datos) => {
        this.productos = datos as any[];
      },
      error: (err) => {
        console.error("Error al obtener productos", err);
      }
    });
  }

  salir(){
    if (confirm('¿Seguro que deseas cerrar sesion?')) {
      
          alert('Sesion cerrada');
          this.router.navigateByUrl('/home',{replaceUrl:true});
        
    }
  }
}
