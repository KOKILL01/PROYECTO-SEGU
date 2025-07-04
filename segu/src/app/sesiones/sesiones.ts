import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, from, Observable } from 'rxjs';

import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs';

import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

import { environment } from '../../environments/environment';

import { firstValueFrom } from 'rxjs';


const helper = new JwtHelperService();
const TOKEN_KEY = 'jwt-token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user: Observable<any> = new Observable<any>();
  private userData = new BehaviorSubject(null);

  private userDataSubject = new BehaviorSubject<any>(null);
  private userSesionSubject = new BehaviorSubject<any>(null);
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  errorMessage: any;

  constructor(
    private http: HttpClient,
    private storage: Storage,
    private router: Router,
    private ptl: Platform //private userService: UserService,
  ) {
    this.ptl.ready().then(async () => {
      await this.inicializateStorage();
      this.loadStoredToken(); // Ahora sí carga el token después de crear la base
    });
  }

  jwtHelper = new JwtHelperService();
  decodeToken(token: string) {
    return this.jwtHelper.decodeToken(token);
  }

  private async inicializateStorage() {
    await this.storage.create();
  }

  loadStoredToken() {
    from(this.storage.get(TOKEN_KEY))
      .pipe(
        map((token) => {
          if (token) {
            if (!helper.isTokenExpired(token)) {
              const decoded = helper.decodeToken(token);
              this.userData.next(decoded);
              this.isAuthenticatedSubject.next(true);
              return true;
            } else {
              this.storage.remove(TOKEN_KEY);
            }
          }
          this.isAuthenticatedSubject.next(false);
          return false;
        })
      )
      .subscribe();
  }

  async getToken(): Promise<string | null> {
    return await this.storage.get(TOKEN_KEY);
  }

  private baseURL = environment.apiUrl;
  async login(correo: string, pass: string): Promise<any> {
    try {
      const response = await this.http
        .post<any>(`${this.baseURL}/login`, { correo, pass })
        .toPromise();

      if (response && response.valido && response.token) {
        const token = response.token;
        const decoded = helper.decodeToken(token);

        await this.storage.set(TOKEN_KEY, token); // Guarda token en almacenamiento local
        this.userData.next(decoded); // Guarda datos del usuario (correo, rol)
        this.isAuthenticatedSubject.next(true); // Marca como autenticado

        return { success: true, token, decoded };
      } else {
        return { success: false, message: 'Credenciales incorrectas' };
      }
    } catch (error) {
      return { success: false, message: 'Error al conectar con el servidor' };
    }
  }

  async obtenerMisPedidos(): Promise<any[]> {
  const token = await this.getToken();

  if (!token) {
    throw new Error('No token disponible');
  }

  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`,
  });

  const observable = this.http.get<any[]>(`${this.baseURL}/misPedidos`, { headers });
  const pedidos = await firstValueFrom(observable);
  return pedidos;
}

  checkTokenConHeader(): Promise<boolean> {
    return this.getToken().then((token) => {
      if (!token) return false;
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });

      return this.http
        .get<{ valido: boolean }>(`${this.baseURL}/checkToken`, { headers })
        .toPromise()
        .then((resp) => {
          if (resp && typeof resp.valido !== 'undefined') {
            return resp.valido;
          }
          return false;
        })
        .catch(() => false);
    });
  }

  async logout() {
    try {
      await this.storage.remove(TOKEN_KEY);
      this.userDataSubject.next(null);
      this.userSesionSubject.next(null);
      this.isAuthenticatedSubject.next(false);
      this.router.navigate(['/login'], { replaceUrl: true });
    } catch (error) {
      throw error;
    }
  }

  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  async isLoggedIn(): Promise<boolean> {
    const token = await this.storage.get(TOKEN_KEY);
    return !!token && !helper.isTokenExpired(token);
  }

  eliminarProductoDeTienda(idproducto: number, idtienda: number) {
    return this.http.delete(
      `${this.baseURL}/eliminarProductoTienda/${idproducto}/${idtienda}`
    );
  }

  // Obtener todos los pedidos por tienda
  obtenerPedidos(idtienda: number) {
    return this.http.get<any[]>(`${this.baseURL}/pedidos/${idtienda}`);
  }

  // Obtener detalles por ID de pedido
  obtenerDetallesPedido(idpedido: number) {
    return this.http.get<any[]>(`${this.baseURL}/detallesPedido/${idpedido}`);
  }

  /**
  async resetPassword(email: string) {
    try {
      await this.http.post(${environment.urlApi}/reset, { email }).toPromise();
    } catch (error) {
      throw error;
    }

  } */

  obtenerProductosPorTienda(idtienda: number) {
    return this.http.get<any[]>(`${this.baseURL}/productosTienda/${idtienda}`);
  }
}
