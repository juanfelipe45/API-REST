import { Component, OnInit } from '@angular/core';
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
  public Imagenes: any = [];
  public Temporal: Imagen = {
    nombre: '',
    descripcion: '',
    imagen: ''
  };
  public message: any;
  public uploadFiles: Array<File>;

  constructor(
    
    private _imagenService: ImagenService,
    private _route: ActivatedRoute,
    private _router: Router
    
    ) {
    this.title = 'Mis Imagenes'
   }

  ngOnInit() {
    console.log('imagenes');
    this.getImagenes();
    this.message = "";
  }

  getImagenes(): void{

    this._route.params.forEach((params: Params) => {
      let album = params['id'];
    
      this._imagenService.getImagen(album).subscribe(
        result => {
          console.log(result)
          this.Imagenes = result;
        },
        err => {
          console.log(err)
        }
        );

    });
  }

  createImagen(): void{

    this._route.params.forEach((params: Params) => {
      let album = params['id'];
      

      this._imagenService.createImagen(this.Temporal, album).subscribe(
        result => {
          this.message = result;
          console.log(result)
          
          this.getImagenes();
        },
        err => {
          console.log(err)
        }
        );

    });
  }

  uploadImage():void{
    let formData = new FormData;
    for (let i = 0; i < this.uploadFiles.length; i++) {
      formData.append("upload[]", this.uploadFiles[i], this.uploadFiles[i].name);
      
    }
    
  }

  onFileChange(e){
    this.uploadFiles = e.target.files;
  }

  onBorrar(id: String):void{
    console.log(id);
    this._imagenService.deleteImagen(id).subscribe(
      result => {
        this.message = result;
        this.getImagenes();
    },err =>{
      console.log(err)
    });
  }

}
