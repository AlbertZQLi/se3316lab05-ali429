import { Component, OnInit } from '@angular/core';
import { CartService} from '../cart.service'
import {VehiclesService} from '../vehicles.service'
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  
    cartItems = [];
    list = [];

  constructor(private cartService : CartService, private vehiclesService : VehiclesService) { }

  ngOnInit() {
        this.cartService.currentCart.subscribe(array => this.cartItems = array )
        this.vehiclesService.getList(this.listCb.bind(this));
  }
  
  clearCart(){
    
    this.cartItems.splice(0,this.cartItems.length)
    document.getElementById("withoutTax").innerHTML = 0
    document.getElementById("withTax").innerHTML = 0

  }
  
  removeItem(event){
    
    
    var id;
    var removingVehicle
    var cartItem;
    var i;
    for(i = 0; i < this.list.length; i++){
      if (this.list[i].name == event.currentTarget.className){
      id = this.list[i]._id
      removingVehicle = i

      }

    }
     for(i = 0; i < this.cartItems.length; i++){
      if (this.cartItems[i].name == event.currentTarget.className){
      cartItem = i

      }

    }

    if(document.getElementById(event.currentTarget.className+'cartQ').innerHTML == 1)
    {
      this.cartItems.splice(cartItem,1)
      
    }
    else{

      document.getElementById(event.currentTarget.className+'cartQ').innerHTML = parseInt(document.getElementById(event.currentTarget.className+'cartQ').innerHTML) - 1

      this.list[removingVehicle].quantity = this.list[removingVehicle].quantity + 1
    }
      this.vehiclesService.changeQuantity(this.list[removingVehicle].quantity, id)
      document.getElementById(this.list[removingVehicle].name+'quantity').innerHTML = ('Stock: '+this.list[removingVehicle].quantity)
  
  document.getElementById("withTax").innerHTML = parseInt(document.getElementById("withTax").innerHTML) - parseInt(this.list[removingVehicle].price *0.01 * (1+this.list[removingVehicle].tax))
      document.getElementById("withoutTax").innerHTML = parseInt(document.getElementById("withoutTax").innerHTML) - parseInt(this.list[removingVehicle].price)
  }
  listCb(res){
    var i;
    for(i = 0; i < res.length; i++){
      this.list.push(res[i])
    }
    
  }

}
