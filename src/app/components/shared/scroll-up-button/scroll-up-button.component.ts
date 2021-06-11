import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-scroll-up-button',
  templateUrl: './scroll-up-button.component.html',
  styleUrls: ['./scroll-up-button.component.css']
})
export class ScrollUpButtonComponent implements OnInit {
  windowposition = window.scrollY;
  constructor() { }
  // check scroll position to display or not display scrollupicon
  @HostListener('window:scroll')
  scrollIt(): void  {
    this.windowposition = window.scrollY;
  }

  ngOnInit(): void {
  }

// scroll to top of the page
  scrollToTop(): void {
    (function smoothscroll(): void {
        const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
        if (currentScroll > 0) {
            window.requestAnimationFrame(smoothscroll);
            window.scrollTo(0, currentScroll - (currentScroll / 8));
        }
    })();
  }

}
