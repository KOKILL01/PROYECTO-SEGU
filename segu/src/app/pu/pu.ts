import { Component, OnInit } from '@angular/core';
import { AuthService } from '../sesiones/sesiones';

@Component({
  selector: 'app-pu',
  standalone: false,
  templateUrl: './pu.html',
  styleUrl: './pu.css'
})
export class Pu {
  pedidos: any[] = [];

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.cargarMisPedidos();
  }


  async cargarMisPedidos() {
    try {
      const response: any = await this.auth.obtenerMisPedidos()
      this.pedidos = response;
    } catch (error) {
      console.error('Error al obtener pedidos:', error);
    }
  }

   
}
