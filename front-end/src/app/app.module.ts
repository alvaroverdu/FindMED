import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module'; 
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { UsuarioLayoutComponent } from './layouts/usuario-layout/usuario-layout.component';

@NgModule({
  declarations: [AppComponent,BlankLayoutComponent,UsuarioLayoutComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
