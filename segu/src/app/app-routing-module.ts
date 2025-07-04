import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './home/home';
import { AdminP } from './admin-p/admin-p';
import { Carrito } from './carrito/carrito';
import { Detalles } from './detalles/detalles';
import { Loguin } from './loguin/loguin';
import { Registrar } from './registrar/registrar';
import { Nproducto } from './nproducto/nproducto';
import { Tienda } from './tienda/tienda';
import { Userempleado } from './userempleado/userempleado';
import { Nptienda } from './nptienda/nptienda';
import { CambioprodComponent } from './cambioprod/cambioprod';
import { PedidodetalleComponent } from './pedidodetalle/pedidodetalle';
import { Pu } from './pu/pu';

const routes: Routes = [
  {
    path:'',component:Home
  },
  {
    path:'home',component:Home
  },
  {
    path:'adminP',component:AdminP
  },
  {
    path:'carrito',component:Carrito
  },
  {
    path:'detalles/:id',component:Detalles
  },
  {
    path:'loguin',component:Loguin
  },
  {
    path:'registrar',component:Registrar
  },
  {
    path:'nproducto', component: Nproducto
  },
  {
    path:'tienda', component: Tienda
  },
  {
    path:'userempleado', component:Userempleado
  },
  {
    path:'nptienda', component: Nptienda
  },
  {
    path: 'cambioprod/:id',    component: CambioprodComponent
  },
  {
    path:'pedidodetalle/:id', component: PedidodetalleComponent
  },
  {
    path:'pu', component: Pu
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
