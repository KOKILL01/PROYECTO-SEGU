import { Component } from '@angular/core';
import { Api } from '../servicios/api';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-nproducto',
  standalone: false,
  templateUrl: './nproducto.html',
  styleUrl: './nproducto.css'
})
export class Nproducto {

  nombre='';
  categoria='';
  precio='';
  descripcion='';
  imagenBase64:string='';

  constructor(private api:Api, private router:Router){}

  convertirImagen(event:Event){
    const input = event.target as HTMLInputElement;

    
    if (!input.files || input.files.length === 0) {
      console.error('No se seleccionó ningún archivo.');
      return;
    }

    const archivo = input.files[0];
    const lector = new FileReader();

    lector.onload = () => {
      this.imagenBase64 = lector.result as string;
      console.log('Imagen convertida:', this.imagenBase64);
    };

    lector.readAsDataURL(archivo);
    }

  subirProd(){
    this.api.subirProd(this.nombre, this.categoria,this.precio,this.descripcion,this.imagenBase64).subscribe({
      next:()=>{
        alert('Producto Registrado');
        this.router.navigate(['/adminP']);
      },
      error:err=>{
        alert("Error: "+err.error?.error);
      }
    })
  }

}
