import { Component, OnInit, ElementRef, Host, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Imagen } from './../../../models/imagen';
import { Album } from '../../../models/album';
import { FormularioService } from './../../../services/formulario/formulario.service';
;

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.sass'],
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

  @Output() mensajeFormulario = new EventEmitter<Imagen>();

  constructor(
    private formularioService: FormularioService,
    private route: ActivatedRoute,
    private elemento: ElementRef,
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
      this.formularioService.saveImagen(formData).subscribe(
          result => {
            console.log(result);
            this.message = result.message;
          }, err => {
            console.log(err);
          }
      );
    }
    var nombre = this.imagen.imagen.split('\\');
    var count = nombre.length;
    nombre = nombre[count-1];
    this.imagen.imagen = nombre;
    for (let i = 0; i< this.album.length; i++){
      if(this.album[i].id == this.imagen.album) { this.imagen.album = this.album[i].nombre; break; }
    }
    console.log(this.imagen.imagen);
    this.mensajeFormulario.emit(this.imagen);
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
      }, err => {
        this.message = err;
        console.log(err);
      }
    );
  }
}
