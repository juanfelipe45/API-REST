import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Imagen } from './../../../models/imagen';
import { Album } from '../../../models/album';
import { FormularioService } from './../../../services/formulario/formulario.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.sass'],
  providers: [FormularioService]
})
export class FormularioComponent implements OnInit {

  public album: Album[];
  public imagen: Imagen = {
    album: '',
    nombre: '',
    descripcion: '',
    imagen: '',
  };
  public message: string = '';

  constructor(
    private formularioService: FormularioService,
    private route: ActivatedRoute,
    private elemento: ElementRef
    ) { }

  ngOnInit() {
    this.getAlbums();
    console.log(this.imagen);
  }

  saveImagen(): void {
    const inputEl: HTMLInputElement = this.elemento.nativeElement.querySelector('#imagen');
    const fileCount: number = inputEl.files.length;
    const formData: FormData = new FormData();
    if (fileCount > 0) {
      formData.append('imagen', inputEl.files.item(0));
      formData.append('album', this.imagen.album);
      formData.append('nombre', this.imagen.nombre);
      formData.append('descripcion', this.imagen.descripcion);
      console.log('El file:', formData);
      this.formularioService.saveImagen(formData).subscribe(
          result => {
            console.log(result);
            this.message = result;
            window.location.reload();
          }, err => {
            console.log(err);
          }
      );
    }
    this.imagen = {
      nombre: '',
      descripcion: '',
      album: '',
      imagen: ''
    };
  }

  getAlbums(): void {
    this.formularioService.getAlbums().subscribe(
      data => {
        this.album = data;
        console.log('La data: ', data);
      }, err => {
        this.message = err;
        console.log(err);
      }
    );
  }

}
