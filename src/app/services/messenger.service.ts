import { Injectable } from '@angular/core';
import { Observable, Subject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MessengerService {

  subject = new Subject();

  Filters = new Subject();

  BurgerMenu = new Subject();

  constructor() { }

// Filter Notification
  filtersChanged(): void
  {
    this.Filters.next('');
  }

  getFilters(): Observable<unknown>
  {
    return this.Filters.asObservable();
  }

  // Shopping Cart Notification
  sendMsg(): void
  {
    this.subject.next('');
  }

  getMsg(): Observable<unknown>
  {
    return this.subject.asObservable();
  }

  // navbar Burger Menu Notification

  BurgerMenuToggle(): void
  {
    this.BurgerMenu.next();
  }

  getBurgerToggle(): Observable<unknown>
  {
    return this.BurgerMenu.asObservable();
  }


}
