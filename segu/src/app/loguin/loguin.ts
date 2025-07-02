import { Component } from '@angular/core';
import { Api } from '../servicios/api';
import { Router } from '@angular/router';
import { Token } from '@angular/compiler';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from '../sesiones/sesiones';

@Component({
  selector: 'app-loguin',
  standalone: false,
  templateUrl: './loguin.html',
  styleUrl: './loguin.css',
})
export class Loguin {
  correo: string = '';
  pass: string = '';
  rol: string = 'cliente';

  constructor(
    private api: Api,
    private router: Router,
    private authService: AuthService
  ) {}

  login() {
    this.authService.login(this.correo, this.pass).then((res) => {
      console.log(res)
      if (res.success) {
        const token = res.token;
        localStorage.setItem('token', token);

        // Para obtener rol del token decodificado
        const rol = res.decoded?.rol;

        if (rol === 'cliente') {
          alert('Bienvenido');
          this.router.navigate(['/home']);
        } else if (rol === 'admin') {
          alert('Bienvenido');
          this.router.navigate(['/adminP']);
        } else if (rol === 'empleado') {
          alert('Bienvenido');
          this.router.navigate(['/tienda']);
        }
      } else {
        alert('Error de autenticacion');
      }
    });
  }
}
