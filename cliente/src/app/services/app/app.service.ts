import { Imagen } from './../../models/imagen';
import { Injectable, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  // constantes
  public URL: string;

  constructor(private http: HttpClient, private el: ElementRef) {this.URL = 'http://localhost:3000/api/'; }


  // Funciones propias
  upload(id: string, formData: FormData) {
      return this.http.post(this.URL + 'upload/' + id, formData);
  }

  getPicture(id: string): any {
    return this.http.get(this.URL + 'upload/' + id);
  }

  saveImagen(imagen: Imagen){
    return this.http.post(this.URL + 'imagen', imagen);
  }
}
