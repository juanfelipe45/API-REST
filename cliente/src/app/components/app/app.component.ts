import { Imagen } from './../../models/imagen';
import { Component, OnInit, ElementRef } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { AppService } from '../../services/app/app.service';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  providers: [AppService]
})
export class appComponent implements OnInit {

  public title: string = 'Needzaio';
  public message: any;
  public picture: any;
  public Temporal: Imagen = {
    nombre: '',
    descripcion: '',
    album: 1,
    imagen: null
  };

  constructor(
      private appService: AppService,
      private route: ActivatedRoute,
      private el: ElementRef
    ) {}

  ngOnInit() {
    this.upload();
    console.log(this.Temporal);
  }

  saveimagen() {
    this.appService.saveImagen(this.Temporal).subscribe(
      result => {
        console.log(result);
      }
    );
    this.upload();
  }

  upload() {
    const inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#imagen');
    const fileCount: number = inputEl.files.length;
    const formData: FormData = new FormData();
    this.route.params.forEach((params: Params) => {
      const id: string = params.id;
      if (fileCount > 0) {
        formData.append('imagen', inputEl.files.item(0));
        this.appService.upload(id, formData).subscribe(
          result => {
            this.message = result;
            console.log('No is bad');
          }, err => {
            console.log(err);
          }
        );
      }
    });
  }

}
