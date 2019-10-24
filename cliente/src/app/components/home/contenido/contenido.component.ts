import { Component, OnInit, Input, Output } from '@angular/core';

import { ContenidoService } from '../../../services/contenido/contenido.service';
import { Imagen } from '../../../models/imagen';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-contenido',
  templateUrl: './contenido.component.html',
  styleUrls: ['./contenido.component.sass']
})
export class ContenidoComponent implements OnInit {

  public title: string;
  public imagen: Imagen[];
  public url: string;
  public message: string = '';

  constructor(private _contenidoService: ContenidoService) {
    this.title = 'MIS IMAGENES';
    this.url = _contenidoService.getUrl();
    
   }

  ngOnInit() {
    this.getImagenes();
  }

  getImagenes(): void {

   this._contenidoService.getImagenes().pipe(take(1)).subscribe(
      data => {
        this.imagen = data;
      }, err => {
        console.log('error:', err);
      }
    );
  }

  updatelist(imagen: Imagen) {
    this.imagen.push(imagen);
  }

  deleteImagen(id: string, imagen: string){
    this._contenidoService.deleteImagenes(id, imagen).pipe(take(1)).subscribe(
      message => {
        this.message = message;
        this.imagen = this.imagen.filter(imagen => imagen.id != id);
      }, err =>{
        this.message = err;
      }
    );
  }
}
