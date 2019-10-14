import { Component, OnInit, ElementRef } from '@angular/core';
import { ImagenService } from '../../services/imagen/imagen.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Imagen } from '../../models/imagen';

@Component({
  selector: 'app-imagen',
  templateUrl: './imagen.component.html',
  styleUrls: ['./imagen.component.sass'],
  providers: [ImagenService]
})
export class ImagenComponent implements OnInit {

  public title: string;
  public Imagenes: Imagen[];
  public Temporal: Imagen = {
    nombre: '',
    descripcion: '',
    imagen: ''
  };
  public message: any;
  public uploadFiles: Array<File>;
  public picture: any;

  constructor(

    private imagenService: ImagenService,
    private route: ActivatedRoute,
    private router: Router,
    private el: ElementRef

    ) {
    this.title = 'Mis Imagenes';
   }

  ngOnInit() {
    this.getImagenes();
    this.picture = this.imagenService.getPicture();
  }


  // Propias
  getImagenes() {
    this.route.params.forEach((params: Params) => {
      const id = params.id;
      this.imagenService.getImagenes(id).subscribe(
        results => {
          console.log(results);
          this.Imagenes = results;
        }, err => {
          console.log(err);
        }
      );
    });
  }
}
