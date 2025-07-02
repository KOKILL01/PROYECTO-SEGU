import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Home } from './home/home';
import { Detalles } from './detalles/detalles';
import { Carrito } from './carrito/carrito';
import { AdminP } from './admin-p/admin-p';
import { Loguin } from './loguin/loguin';
import { Registrar } from './registrar/registrar';


import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Nproducto } from './nproducto/nproducto';
import { Tienda } from './tienda/tienda';
import { Userempleado } from './userempleado/userempleado';
import { Nptienda } from './nptienda/nptienda';
import { IonicStorageModule } from '@ionic/storage-angular';
import { CambioprodComponent } from './cambioprod/cambioprod';
import { PedidodetalleComponent } from './pedidodetalle/pedidodetalle';

@NgModule({
  declarations: [
    App,
    Home,
    Detalles,
    Carrito,
    AdminP,
    Loguin,
    Registrar,
    Nproducto,
    Tienda,
    
    Nptienda,
    
  ],
  imports: [
    BrowserModule,
    Userempleado,
    CambioprodComponent,
    PedidodetalleComponent,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    IonicStorageModule.forRoot()
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
