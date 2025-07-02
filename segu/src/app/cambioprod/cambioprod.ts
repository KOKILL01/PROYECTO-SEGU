import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Api } from '../servicios/api';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cambioprod',
  standalone:true,
  imports:[FormsModule,CommonModule],
  templateUrl: './cambioprod.html',
  styleUrl: './cambioprod.css'
})
export class CambioprodComponent {
  
  producto: any = {
    nombre: '',
    categoria: '',
    precio: '',
    descripcion: '',
    imagen: ''
  };

  id: number = 0;

  constructor(private route: ActivatedRoute, private api: Api, private router: Router) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.api.obtenerProductoPorId(this.id.toString()).subscribe({
      next: (data) => this.producto = data,
      error: (err) => console.error('Error al obtener producto', err)
    });
  }

  guardarCambios() {
    this.api.editarProducto(this.id, this.producto).subscribe({
      next: () => {
        alert('Producto actualizado');
        this.router.navigate(['/adminP']);
      },
      error: (err) => console.error('Error al actualizar', err)
    });
  }

  eliminarProducto() {
    if (confirm('¿Seguro que deseas eliminar este producto?')) {
      this.api.eliminarProducto(this.id).subscribe({
        next: () => {
          console.log('Producto eliminado con id:', this.id);
          alert('Producto eliminado');
          this.router.navigate(['/adminP']);
        },
        error: (err) => console.error('Error al eliminar', err)
      });
    }
  }
}
