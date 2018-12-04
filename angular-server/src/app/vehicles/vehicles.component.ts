import { Component, OnInit } from '@angular/core';
import {VehiclesService} from '../vehicles.service'
import { DOCUMENT } from '@angular/common'; 
import {CartService} from '../cart.service'

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css'],
  providers: [VehiclesService]
})
export class VehiclesComponent implements OnInit {
  
  vehicleList = [];
  
  vehicleName = "";
  vehiclePrice = "";
  vehicleQuantity = "";
  vehicleTax = "";
  vehicleHP = "";
  vehicleSeats = "";
  vehicleTopSpeed = "";
  
  vehicleNames = [];
  vehicleImages = [];
  vehicleFunctions = [];
  

  
  
  

  constructor(private vehiclesService : VehiclesService, private cartService : CartService) { }
  
  reload(){
    location.reload();
  }

  ngOnInit() {
    this.vehiclesService.getList(this.createList.bind(this));
  }

  createList(res){
    var i;  
    for(i = 0; i < res.length; i++){
/*      this.vehicleList = this.vehicleList + "<div><p> Vehicle: "+res[i].name+", Price: $"+res[i].price.toString()+"</p>"+
      "<img (click) = 'this.addDescription(12)' src = "+res[i].image+" height='100' ></img>";*/
      
      this.vehicleNames.push(res[i].name);
      this.vehicleList.push(res[i]);
      this.vehicleImages.push(res[i].image);


    }
    
  }
  
  public addDescription(event){
    var vehicle = this.vehicleList[event.currentTarget.id];
    this.vehicleName = "Model: "+vehicle.name;
    this.vehiclePrice = "Price: $"+vehicle.price;
    this.vehicleQuantity = "Quantity: "+vehicle.quantity;
    this.vehicleTax = "Tax: "+vehicle.tax+"%"
    this.vehicleHP = "Horse Power: "+vehicle.horsePower+"HP"
    this.vehicleSeats = "Seats: "+vehicle.seats
    this.vehicleTopSpeed = "Top Speed: "+vehicle.topSpeed+" kph"
       var x =  document.getElementById("desc");
        x.style.display = "block";
                      
}
  closeDesc(event){
   var x =  document.getElementById("desc");
        x.style.display = "none";
    
  }
  
  addItem(event){

    var vehicle = this.vehicleList[event.currentTarget.id];
    var i = vehicle.name
    console.log(vehicle)
    if(document.getElementById(i) == null)
    this.cartService.cartAdd(vehicle)
    else if  (document.getElementById(i).innerHTML == vehicle.quantity)
    alert ("error")
    else
    {
      console.log(document.getElementById(i))
      document.getElementById(i).innerHTML = parseInt(document.getElementById(i).innerHTML) + 1 
    }

  }
  
}