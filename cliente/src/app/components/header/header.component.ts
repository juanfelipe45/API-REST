import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  public onClick: boolean = false;
  public onClick1: boolean = false;
  public onClick2: boolean = false;
  public onClick3: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  onClickChange(): void {
    if (this.onClick === false) {
      this.onClick = true;
      this.onClick1 = false;
      this.onClick2 = false;
      this.onClick3 = false;
    }
  }

  onClickChange1(): void {
    if (this.onClick1 === false) {
      this.onClick1 = true;
      this.onClick3 = false;
      this.onClick2 = false;
      this.onClick = false;
    }
  }

  onClickChange2(): void {
    if (this.onClick2 === false) {
      this.onClick2 = true;
      this.onClick3 = false;
      this.onClick1 = false;
      this.onClick = false;
    }
  }

  onClickChange3(): void {
    if (this.onClick3 === false) {
      this.onClick3 = true;
      this.onClick2 = false;
      this.onClick1 = false;
      this.onClick = false;
    }
  }

}
