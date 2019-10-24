import { Component, ElementRef, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Album } from '../../../models/album';
import { Imagen } from './../../../models/imagen';
import { FormularioService } from './../../../services/formulario/formulario.service';



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
            this.message = result.message;
            this.imagen.id = result.data.insertId;
            let nombre = this.imagen.imagen.split('\\');
            const count = nombre.length;
            nombre = nombre[count - 1];
            this.imagen.imagen = nombre;
            for (const i  in this.album) {
              if (this.album[i].id == this.imagen.album) { this.imagen.album = this.album[i].nombre; break; }
            }
            this.mensajeFormulario.emit(this.imagen);
            this.imagen = {
              nombre: '',
              descripcion: '',
              album: '',
              imagen: ''
            };
          }, err => {
            this.message = err;
          }
      );
    }
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
