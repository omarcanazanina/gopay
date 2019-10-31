import * as core from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy} from '@ionic/angular';

import { AppRoutingModule} from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { NgxQRCodeModule } from 'ngx-qrcode2';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestore, FirestoreSettingsToken } from '@angular/fire/firestore';
//para modales
import { UsuarioComponent } from './componentes/usuario/usuario.component';
import { DetalleenviocobroPage } from './detalleenviocobro/detalleenviocobro.page'
import { DetalleingresoegresoPage } from './detalleingresoegreso/detalleingresoegreso.page';
import { DetalleegresoPage } from './detalleegreso/detalleegreso.page';
import { EnviadatosgmailPage } from './enviadatosgmail/enviadatosgmail.page';
//notificaciones*ambos
import { FCM } from '@ionic-native/fcm/ngx';
//prueba para las notificaciones 
import { Firebase } from '@ionic-native/firebase/ngx';
import { HttpClientModule } from '@angular/common/http';
import { Contacts } from '@ionic-native/contacts/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
//import { GooglePlus } from '@ionic-native/google-plus/ngx';
//mascaras de inputs
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { PipesModule } from './pipes/pipes.module';
import {EmailComposer} from '@ionic-native/email-composer/ngx'


export const firebaseConfig = {
  apiKey: "AIzaSyAh2szIwesscLDnbKDlnHnB2LRdO5A0_rg",
  authDomain: "aplicacion-bdcf5.firebaseapp.com",
  databaseURL: "https://aplicacion-bdcf5.firebaseio.com",
  projectId: "aplicacion-bdcf5",
  storageBucket: "aplicacion-bdcf5.appspot.com",
  messagingSenderId: '558881935841'
};

@core.NgModule({
  declarations: [AppComponent,
    UsuarioComponent,
    DetalleenviocobroPage,
    DetalleingresoegresoPage,
    DetalleegresoPage,
    EnviadatosgmailPage
  ],

  entryComponents: [UsuarioComponent,
    DetalleenviocobroPage,
    DetalleingresoegresoPage,
    DetalleegresoPage,
    EnviadatosgmailPage
  ],
  imports: [BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    NgxQRCodeModule,
    PipesModule,
    AngularFireAuthModule,
  ],

  providers: [
    { provide: FirestoreSettingsToken, useValue: {} },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    BarcodeScanner,
    AngularFireDatabase,
    Firebase,
    LocalNotifications,
    FCM,
    Contacts,
    EmailComposer,
   // GooglePlus,
    AngularFirestore,
    SocialSharing,
    InAppBrowser
  ],

  bootstrap: [AppComponent]


})
export class AppModule { }
