import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';

//PROVIDE
import { JwtHelperService, JWT_OPTIONS }  from '@auth0/angular-jwt'

import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { DashboardModule } from './pages/dashboard/dashboard.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokeninterceptorsService } from './core/interceptors/tokeninterceptors.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    DashboardModule
  ],
  providers: [
    //JWT
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService, //esto es para ver el token decodificar y codificar
    //TOKEN
    { provide: HTTP_INTERCEPTORS, useClass: TokeninterceptorsService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
