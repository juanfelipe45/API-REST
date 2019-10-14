import { Imagen } from './../../models/imagen';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImagenService {

  private url: string;
  private imagen: Imagen;

  constructor(private http: HttpClient) { this.url = 'http://localhost:3000/api/'; }



  // Mis funciones
  getImagenes(id: string) {
    return this.http.get(this.url + 'imagen-album/' + id).pipe(map( (data: any) => {
      console.log('Antes de mapear', data);
      return data.Imagenes;
    }));
  }

  getPicture() {
    return this.url + 'picture/';
  }

  saveImagen() {}

  upload(formData: FormData) {
    return this.http.post(this.url + 'imagen', formData);
}
}
