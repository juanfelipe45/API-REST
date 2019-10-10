import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Imagen } from '../../models/imagen';

@Injectable({
  providedIn: 'root'
})
export class ImagenService {

  public url: string;

  constructor(private _http: HttpClient) { this.url = 'http://localhost:3000/api/'; }



  // Mis funciones
  getImagen(album: any) {
    return  this._http.get(this.url+'imagen/'+album);
  }

  createImagen(imagen: Imagen, album) {
    return  this._http.post(this.url+'imagen/'+ album, imagen);
  }

  uploadImage(formData){
    return this._http.post(this.url+'imagen/', formData);
  }
  
  deleteImagen(id: String) {
    return this._http.delete(this.url+'imagen/'+id);
  }


}
