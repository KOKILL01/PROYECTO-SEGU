import { Component } from '@angular/core';

@Component({
  selector: 'app-carrito',
  standalone: false,
  templateUrl: './carrito.html',
  styleUrl: './carrito.css',
})
export class Carrito {
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
    this.carrito.splice(index, 1); // Elimina el producto del arreglo
    localStorage.setItem('carrito', JSON.stringify(this.carrito)); // Actualiza localStorage
    this.total = this.carrito.reduce(
      (acc, prod) => acc + parseFloat(prod.precio),
      0
    ); // Recalcula total
  }

  //|||||||||||||--------------------------pedidos----------------------|||||||||||||||

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

    fetch('http://localhost:3000/ordenar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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
  }

  
}
