import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cookiewindow',
  templateUrl: './cookiewindow.component.html',
  styleUrls: ['./cookiewindow.component.css']
})
export class CookiewindowComponent implements OnInit {

  constructor(private cookie: CookieService) { }

  displaycookiewindow = false;
  ngOnInit(): void {
    if (this.cookie.check('cookiewindow'))
    {
      this.displaycookiewindow = false;
    }
    else
    {
      this.displaycookiewindow = true;
    }
  }

  hidecookieinfo(): void{
    this.displaycookiewindow = false;
    this.cookie.set('cookiewindow', 'set', 365);
  }

}
