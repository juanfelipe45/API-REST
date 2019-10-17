import { Component, OnInit } from '@angular/core';

import { ContenidoService } from '../../../services/contenido/contenido.service';
import { Imagen } from '../../../models/imagen';

@Component({
  selector: 'app-contenido',
  templateUrl: './contenido.component.html',
  styleUrls: ['./contenido.component.sass'],
  providers: [ContenidoService]
})
export class ContenidoComponent implements OnInit {

  public title: string;
  public imagen: Imagen[];
  public url: string;

  constructor(private contenidoService: ContenidoService) {
    this.title = 'MIS IMAGENES';
    this.url = contenidoService.getUrl();
   }

  ngOnInit() {
    this.getImagenes();
  }

  getImagenes(): void {

    this.contenidoService.getImagenes().subscribe(
      data => {
        console.log('Informacion:', data);
        this.imagen = data;
      }, err => {
        console.log('error:', err);
      }
    );
  }
}
