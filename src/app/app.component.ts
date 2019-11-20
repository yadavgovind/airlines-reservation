import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  title = 'flight-demo-project';
  constructor(
private elementRef:ElementRef
  ){}

  ngAfterViewInit(){
    var style=document.createElement('link');
    style.type="text/css";
    style.href='./assets/css/style.css';
    style.rel="stylesheet";
    this.elementRef.nativeElement.appendChild(style);

  }
}
