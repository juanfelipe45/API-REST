import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Imagen } from '../../models/imagen';

@Injectable({
  providedIn: 'root'
})
export class ContenidoService {

  private url: string;

  constructor(private _http: HttpClient) { this.url = 'http://localhost:3000/api/'; }

  getImagenes(): Observable<Imagen[]> {
    return this._http.get(this.url + 'imagen')
      .pipe(map((data: any) => {
        return data.Imagenes;
      })
    );
  }

  deleteImagenes(id: string, imagen: string): Observable<string>{
    return this._http.delete(this.url + 'imagen/' + id + '/' + imagen)
      .pipe(map((message: any) => {
        return message.message;
      })
    );
  }

  getUrl(): string {
    return this.url + 'picture/';
  }
}
