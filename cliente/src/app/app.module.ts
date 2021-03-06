import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FormularioComponent } from './components/home/formulario/formulario.component';
import { ContenidoComponent } from './components/home/contenido/contenido.component';
import { ContenidoService } from './services/contenido/contenido.service';
import { FormularioService } from './services/formulario/formulario.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FormularioComponent,
    ContenidoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ContenidoService, FormularioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
