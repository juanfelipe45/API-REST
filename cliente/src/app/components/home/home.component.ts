import { Component, OnInit, ViewChild } from '@angular/core';
import { Imagen } from 'src/app/models/imagen';
import { ContenidoComponent } from './contenido/contenido.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  enviarAcontenido: Imagen;

  @ViewChild(ContenidoComponent, undefined) contenido: ContenidoComponent;

  constructor() { }

  ngOnInit() {
  }

  updateImagen(imagen: Imagen){

    this.enviarAcontenido = imagen;
    this.contenido.updatelist(this.enviarAcontenido);
  }

}
