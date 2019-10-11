import { Injectable } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AppService {

  //constantes
  public URL: string;
  public uploader: FileUploader;

  constructor(private _http: HttpClient) { 
    this.URL = 'http://localhost:3000/api/upload';
    this.uploader = new FileUploader({ url: this.URL, itemAlias: 'imagen' });
  }


  // Funciones propias
  upload() {
    this.uploader.onAfterAddingAll = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item:any, res:any, status:any, headers:any) => {
      console.log("Imagen Actualizada: acutlizada en: ", item, status, res);
    }
  } 
}
