import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuard} from './guards/auth.guard';
import {NologinGuard} from './guards/nologin.guard'
const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'escaner/:montito/:correo', loadChildren: './escaner/escaner.module#EscanerPageModule' },
  { path: 'cards/:correo', loadChildren: './cards/cards.module#CardsPageModule' },
  { path: 'tabs', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'tab2', loadChildren: './tab2/tab2.module#Tab2PageModule' , canActivate:[AuthGuard]},
  { path: 'recibedinero', loadChildren: './recibedinero/recibedinero.module#RecibedineroPageModule' },
  { path: 'index', loadChildren: './index/index.module#IndexPageModule'  ,canActivate:[NologinGuard]},
  { path: 'index2', loadChildren: './index2/index2.module#Index2PageModule' ,canActivate:[NologinGuard]},
  { path: 'indexconfirmacion', loadChildren: './indexconfirmacion/indexconfirmacion.module#IndexconfirmacionPageModule' , canActivate:[NologinGuard]},
  { path: 'registrate', loadChildren: './registrate/registrate.module#RegistratePageModule' },
  { path: 'cobroqr', loadChildren: './cobroqr/cobroqr.module#CobroqrPageModule' },
  { path: 'tab4', loadChildren: './tab4/tab4.module#Tab4PageModule' },
  { path: 'ingresoegreso', loadChildren: './ingresoegreso/ingresoegreso.module#IngresoegresoPageModule' },
  { path: 'detalleingresoegreso/:id', loadChildren: './detalleingresoegreso/detalleingresoegreso.module#DetalleingresoegresoPageModule' },
  { path: 'detalleegreso/:id', loadChildren: './detalleegreso/detalleegreso.module#DetalleegresoPageModule' },
  { path: 'tarjetas', loadChildren: './tarjetas/tarjetas.module#TarjetasPageModule' },
  { path: 'moverdinero', loadChildren: './moverdinero/moverdinero.module#MoverdineroPageModule' },
  { path: 'nuevatarjeta', loadChildren: './nuevatarjeta/nuevatarjeta.module#NuevatarjetaPageModule' },
  { path: 'moverconfirmacion/:dato1/:dato2', loadChildren: './moverconfirmacion/moverconfirmacion.module#MoverconfirmacionPageModule' },
  { path: 'enviacobro', loadChildren: './enviacobro/enviacobro.module#EnviacobroPageModule' },
  { path: 'pagarenviocobro/:id/:nombre', loadChildren: './pagarenviocobro/pagarenviocobro.module#PagarenviocobroPageModule' },
  { path: 'detalleenviocobro', loadChildren: './detalleenviocobro/detalleenviocobro.module#DetalleenviocobroPageModule' },
  { path: 'transferencias', loadChildren: './transferencias/transferencias.module#TransferenciasPageModule' },
  { path: 'historialenviocobro/:id', loadChildren: './historialenviocobro/historialenviocobro.module#HistorialenviocobroPageModule' },
  { path: 'cargarsaldo/:id', loadChildren: './cargarsaldo/cargarsaldo.module#CargarsaldoPageModule' },
  { path: 'confirmacargasaldo/:id', loadChildren: './confirmacargasaldo/confirmacargasaldo.module#ConfirmacargasaldoPageModule' },
  { path: 'cargacontarjeta/:id', loadChildren: './cargacontarjeta/cargacontarjeta.module#CargacontarjetaPageModule' },
  { path: 'retirarsaldo/:id', loadChildren: './retirarsaldo/retirarsaldo.module#RetirarsaldoPageModule' },
  { path: 'retirarconcuenta/:id', loadChildren: './retirarconcuenta/retirarconcuenta.module#RetirarconcuentaPageModule' },
  { path: 'confirmaretirosaldo/:id', loadChildren: './confirmaretirosaldo/confirmaretirosaldo.module#ConfirmaretirosaldoPageModule' },
  { path: 'transferir', loadChildren: './transferir/transferir.module#TransferirPageModule' },
  { path: 'historial', loadChildren: './historial/historial.module#HistorialPageModule' },
  { path: 'telefono/:nombre/:email/:contrasena/:pin', loadChildren: './registroDatos/telefono/telefono.module#TelefonoPageModule' },
  { path: 'password/:nombre/:email', loadChildren: './registroDatos/password/password.module#PasswordPageModule' },
  { path: 'pin/:nombre/:email/:contrasena', loadChildren: './registroDatos/pin/pin.module#PinPageModule' },
  { path: 'nombre', loadChildren: './registroDatos/nombre/nombre.module#NombrePageModule' },
  { path: 'correo/:nombre', loadChildren: './registroDatos/correo/correo.module#CorreoPageModule' },
  { path: 'pruebasms', loadChildren: './pruebasms/pruebasms.module#PruebasmsPageModule' },
  { path: 'confirmarnum/:token/:telefono', loadChildren: './registroDatos/confirmarnum/confirmarnum.module#ConfirmarnumPageModule' },
  { path: 'enviadatosgmail/:id', loadChildren: './enviadatosgmail/enviadatosgmail.module#EnviadatosgmailPageModule' },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
