import { Component, OnInit } from '@angular/core';
import { AppService } from '../../services/app/app.service';
import { FileUploader } from 'ng2-file-upload';


@Component({
  selector: 'app-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  providers: [AppService]
})
export class appComponent implements OnInit {

  public title: string = 'Needzaio';
  private URL: string = 'http://localhost:3000/api/upload/1';
  public uploader: FileUploader = new FileUploader({url: this.URL, itemAlias: 'imagen'});
  public message: string = '';

  //public uploader:any;

  constructor( private _appService: AppService ) {
    //this.uploader = _appService.upload();
  }

  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => {file.withCredentials = false; };
    this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
      console.log("Imagen subida", item, status, response, headers);
    }

    //this.uploader;
  }

}
