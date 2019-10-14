import { Component, OnInit } from '@angular/core';
import { AlbumService } from '../../services/album/album.service';
import { Album } from '../../models/albums';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.sass'],
  providers: [AlbumService]
})
export class AlbumComponent implements OnInit {

  public title: string = 'Mis albums';
  public Albums: any = [];
  public Temporal: Album = {nombre: ''};
  public message: any;

  constructor(private _albumService: AlbumService) {
    this.title = 'Mis albumes';
   }

  ngOnInit() {
    console.log('Se han cargado los Albumes');
    this.getAlbums();
    this.message = '';
  }

  getAlbums(): void {
    this._albumService.getAlbums().subscribe(
      result => {
        console.log(result);
        this.Albums = result;
        console.log(this.Albums.albums.length);
      },
      err => {
        console.log(err);
      }
      );
  }

  createAlbums(): void {
    this._albumService.createAlbum(this.Temporal).subscribe(
      result => {
        this.message = result;
        console.log(result);
        this.getAlbums();
      },
      err => {
        console.log(err);
      }
    );
  }

  onBorrar(id: string) {
    console.log(id);
    this._albumService.deleteAlbum(id).subscribe(
      result => {
        this.message = result;
        this.getAlbums();
    }, err => {
      console.log(err);
    });
  }

}
