import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { Imagen } from '../../models/imagen';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContenidoService {

  private url: string;

  constructor(private http: HttpClient) { this.url = 'http://localhost:3000/api/'; }

  getImagenes(): Observable<Imagen[]> {
    return this.http.get(this.url + 'imagen').pipe(map((data: any) => {
      return data.Imagenes;
    }));
  }

  getUrl(): string {
    return this.url + 'picture/';
  }
}