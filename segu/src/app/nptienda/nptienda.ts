import { Component } from '@angular/core';
import { Api } from '../servicios/api';
import { AuthService } from '../sesiones/sesiones';

@Component({
  selector: 'app-nptienda',
  standalone: false,
  templateUrl: './nptienda.html',
  styleUrl: './nptienda.css',
})
export class Nptienda {
  productos: any[] = [];

  constructor(private api: Api, private auth: AuthService) {}

  ngOnInit(): void {
    this.api.obtenerProductos().subscribe({
      next: (datos) => {
        this.productos = datos as any[];
      },
      error: (err) => {
        console.error('Error la obtener productos', err);
      },
    });
  }

  async anadirProducto(prod: any) {
    const token = await this.auth.getToken();

    if (token) {
      const decoded = this.auth.decodeToken(token);
      const idtienda = decoded.id;
      const tienda=decoded.tienda;
      this.api.anadirProductoATienda(prod.id, idtienda,tienda).subscribe({
        next: () => {
          alert('Producto añadido correctamente');
        },
        error: (err) => {
          if (err.status === 400) {
            alert('⚠️ Este producto ya está registrado en tu tienda.');
          } else {
            console.error('Error al añadir producto', err);
            alert('Ocurrió un error inesperado al añadir el producto.');
          }
        },
      });
    } else {
      alert('Debes iniciar sesión');
    }
  }
}
