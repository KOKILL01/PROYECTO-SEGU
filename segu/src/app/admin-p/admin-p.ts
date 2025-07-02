import { Component } from '@angular/core';
import { Api } from '../servicios/api';

@Component({
  selector: 'app-admin-p',
  standalone: false,
  templateUrl: './admin-p.html',
  styleUrl: './admin-p.css'
})
export class AdminP {
productos: any[] = [];

  constructor(private api: Api) {}

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
}
