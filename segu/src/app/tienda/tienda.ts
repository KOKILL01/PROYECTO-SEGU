import { Component } from '@angular/core';
import { AuthService } from '../sesiones/sesiones';

import { OnInit } from '@angular/core';

@Component({
  selector: 'app-tienda',
  standalone: false,
  templateUrl: './tienda.html',
  styleUrl: './tienda.css',
})
export class Tienda {
  productos: any[] = [];
  IDEmpleado: number = 0;
  constructor(private authService: AuthService) {}

  async ngOnInit() {
  const token = await this.authService.getToken();
  if (token) {
    const decoded = this.authService.decodeToken(token);
    this.IDEmpleado = decoded.id;
    const idTienda = decoded.tienda;

    // Productos
    this.authService
      .obtenerProductosPorTienda(this.IDEmpleado)
      .subscribe(data => this.productos = data);

    // Pedidos
    this.authService
      .obtenerPedidos(idTienda)  // ← 🔁 aquí el cambio importante
      .subscribe(data => {console.log('Pedidos recibidos:', data);this.pedidos = data});
  }
}

  eliminarProducto(idproducto: number) {
    console.log('ID a eliminar:', idproducto, 'de tienda:', this.IDEmpleado); // para revisar

    if (!confirm('¿Estás seguro de eliminar este producto de esta tienda?'))
      return;

    this.authService
      .eliminarProductoDeTienda(idproducto, this.IDEmpleado)
      .subscribe({
        next: () => {
          this.productos = this.productos.filter(
            (p) => p.idproducto !== idproducto
          );
        },
        error: (err) => {
          console.error('Error al eliminar producto:', err);
          alert('No se pudo eliminar el producto.');
        },
      });
  }


  pedidos: any[] = [];
detallesSeleccionados: any[] = [];

mostrarDetalles(idpedido: number) {
  this.authService.obtenerDetallesPedido(idpedido).subscribe(data => {
    this.detallesSeleccionados = data;
  });
}



}
