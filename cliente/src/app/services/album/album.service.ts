import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Album } from '../../models/albums';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  public url: string;

  constructor(private _http: HttpClient) { this.url = 'http://localhost:3000/api/'; }



  // Mis funciones
  getAlbums() {
    return  this._http.get(this.url+'album');
  }

  createAlbum(album: Album) {
    return  this._http.post(this.url+'album', album);
  }

  deleteAlbum(id: String) {
    return this._http.delete(this.url+'album/'+id);
  }
}
