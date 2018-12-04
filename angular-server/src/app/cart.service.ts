import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  cart = [];
  
  private cartSource = new BehaviorSubject<Array<Object>>(this.cart);
  
  currentCart = this.cartSource.asObservable();

  constructor() { }
  
  cartAdd(item : Object){
    this.cart.push(item);
    this.cartSource.next(this.cart);
  }
}
