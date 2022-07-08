import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DragulaModule } from 'ng2-dragula';

import { AuthModule } from './auth/auth.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PagesModule } from './pages/pages.module';
import { CommonsModule } from './commons/commons.module';
import { UsuarioLayoutComponent } from './layouts/usuario-layout/usuario-layout.component';
import { InfoLayoutComponent } from './layouts/info-layout/info-layout.component';

@NgModule({
  declarations: [
    AppComponent,
    UsuarioLayoutComponent,
    InfoLayoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    PagesModule,
    CommonsModule,
    DragulaModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
