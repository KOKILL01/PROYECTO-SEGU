import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../sesiones/sesiones'; // o como lo llames

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pedidodetalle',
  standalone:true,
  templateUrl: './pedidodetalle.html',
  imports:[CommonModule],
  styleUrls: ['./pedidodetalle.css']
})
export class PedidodetalleComponent implements OnInit {
  detalles: any[] = []; 
  total: number = 0;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.authService.obtenerDetallesPedido(Number(id)).subscribe(data => {
        this.detalles = data;
        this.total = this.calcularTotal(); // Calcula total después de recibir los datos
      });
    }
  }

  calcularTotal(): number {
    return this.detalles.reduce((sum, item) => sum + Number(item.precio), 0);
  }
}
