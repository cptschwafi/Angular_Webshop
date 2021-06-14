import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'SchwafisPlace';
  constructor(private elementRef: ElementRef){}
ngOnInit(): void {
  // delete overflow on html body
  this.elementRef.nativeElement.ownerDocument.body.style.setProperty('overflow-x', 'hidden', 'important');
}

}

