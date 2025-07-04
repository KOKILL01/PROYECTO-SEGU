import { Component } from '@angular/core';
import { environment } from '../../environments/environment';
import { AuthService } from '../sesiones/sesiones';

@Component({
  selector: 'app-carrito',
  standalone: false,
  templateUrl: './carrito.html',
  styleUrl: './carrito.css',
})
export class Carrito {

  constructor(private auth: AuthService) {}

  carrito: any[] = [];
  total: number = 0;
  folio: number = 0;

  ngOnInit() {
    this.carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
    this.carrito.forEach((p) => {
      if (!p.tiendaSeleccionada && p.tiendas && p.tiendas.length > 0) {
        p.tiendaSeleccionada = p.tiendas[0];
      }
    });
    this.total = this.carrito.reduce(
      (acc, prod) => acc + parseFloat(prod.precio),
      0
    );
    this.folio = Math.floor(Math.random() * 1000000);
  }

  eliminarDelCarrito(index: number) {
    this.carrito.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(this.carrito));
    this.total = this.carrito.reduce(
      (acc, prod) => acc + parseFloat(prod.precio),
      0
    );
  }

  ordenar() {
    const pedidosPorTienda: any = {};

    this.carrito.forEach((prod) => {
      const tienda = prod.tiendaSeleccionada;
      if (!pedidosPorTienda[tienda]) {
        pedidosPorTienda[tienda] = {
          folio: Math.floor(Math.random() * 1000000),
          productos: [],
        };
      }

      pedidosPorTienda[tienda].productos.push({
        id: prod.id,
        nombre: prod.nombre,
        precio: prod.precio,
      });
    });

    this.auth.getToken().then((token) => {
      console.log('Token obtenido:', token);

      fetch(`${environment.apiUrl}/ordenar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(pedidosPorTienda),
      })
        .then((response) => response.json())
        .then((data) => {
          alert('Pedido enviado exitosamente');
          localStorage.removeItem('carrito');
          location.reload();
        })
        .catch((err) => {
          alert('Error al enviar pedido: ' + err.message);
        });
    });
  }
}
