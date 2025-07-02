import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from '../sesiones/sesiones';

@Injectable({
  providedIn: 'root'
})
export class Api {

  private baseURL=environment.apiUrl;

  constructor(private http:HttpClient) { }

  registrarUsuario(nombre:String,contra:string,correo:string,rol:string,sucursal:string){
    return this.http.post(`${this.baseURL}/usuarios`,{nombre,contra,correo,rol,sucursal});
  }


  
  
  verificarLoguin(correo:string, pass:string){

    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token')
    });

    return this.http.post(`${this.baseURL}/login`,{correo,pass},{headers});
  }




  subirProd(nombre:string, categoria:string, precio:string, descripcion:string, imagen:string){
    return this.http.post(`${this.baseURL}/sprod`,{nombre,categoria,precio,descripcion,imagen })
  }

  obtenerProductos(){
    return this.http.get(`${this.baseURL}/obproductos`);
  }

  obtenerProductoPorId(id: string) {
    return this.http.get(`${this.baseURL}/productos/${id}`);
  }

  obtenerComentario(id:string){
    return this.http.get(`${this.baseURL}/comentarios/${id}`);
  }

  subircomentario(com:string,id:number){
    return this.http.post(`${this.baseURL}/subirComentario/${id}`,{com});
  }


  anadirProductoATienda(idproducto: number, idtienda: number,tienda:string) {
    return this.http.post(`${this.baseURL}/anadirProductoATienda`, { idproducto, idtienda,tienda });
  }




  editarProducto(id: number, producto: any) {
  return this.http.put(`${this.baseURL}/productos/${id}`, producto);
}

eliminarProducto(id: number) {
  return this.http.delete(`${this.baseURL}/productos/${id}`);
}

eliminarProductoDeTienda(idproducto: number, idtienda: number) {
  return this.http.delete(`${this.baseURL}/eliminarProductoTienda/${idproducto}/${idtienda}`);
}



}
