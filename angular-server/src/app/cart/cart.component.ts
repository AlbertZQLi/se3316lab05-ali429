import { Component, OnInit } from '@angular/core';
import { CartService} from '../cart.service'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  
    cartItems = [];

  constructor(private cartService : CartService) { }

  ngOnInit() {
        this.cartService.currentCart.subscribe(array => this.cartItems = array )
  }
  
  cartUpdate(){

  }


}
