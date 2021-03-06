import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Imagen } from '../../models/imagen';
import { Album } from '../../models/album';

@Injectable({
  providedIn: 'root'
})
export class FormularioService {

  private url: string;

  constructor(private http: HttpClient) { this.url = 'http://localhost:3000/api/'; }

  saveImagen(imagen: FormData): any {
    return this.http.post(this.url + 'imagen', imagen).pipe(map((data: any) => {
      return data;
    }));
  }

  getAlbums(): Observable<Album[]> {
    return this.http.get(this.url + 'album').pipe(map((data: any) => {
      return data.albums;
    }));
  }
}
