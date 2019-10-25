import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  public tabActivated: number = 1;
  public modalAddAlbum: boolean = false;
  public title: string = 'hola';

  constructor() { }

  ngOnInit() {
  }

  changeTab(tab: number): void {
    this.tabActivated = tab;
  }

  modalActivate(): void {
    this.modalAddAlbum = true;
  }

  modalClose(): void {
    this.modalAddAlbum = false;
  }

}
