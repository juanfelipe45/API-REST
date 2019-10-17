import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { Imagen } from '../../models/imagen';

@Injectable({
  providedIn: 'root'
})
export class ContenidoService {

  private url: string;

  constructor(private http: HttpClient) { this.url = 'localhost:3000/api/'; }

  getImagenes(): Imagen[] {
    return
  }
}
