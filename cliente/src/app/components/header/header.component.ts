import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  public tabActivated: number = 1;

  constructor() { }

  ngOnInit() {
  }

  changeTab(tab: number): void {
    this.tabActivated = tab;
  }

}
