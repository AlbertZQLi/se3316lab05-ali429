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
  vehicleID = "";
  
  vehicleNames = [];
  vehicleImages = [];
  vehicleFunctions = [];
  
  allComments = []
  cByVehicles = []
  
  cv;
  cvn;
  
  

  constructor(private vehiclesService : VehiclesService, private cartService : CartService) { }
  
  reload(){
    location.reload();
  }

  ngOnInit() {
    this.vehiclesService.getList(this.createList.bind(this));
    this.vehiclesService.getComments(this.createCommentList.bind(this))
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
  createCommentList(res){
        var i;  
    for(i = 0; i < res.length; i++){
      this.allComments.push(res[i]);
    }
  }
  findVehicleComments(event){
    var vehicle = event.currentTarget.id
    this.cByVehicles = [];
    for(var i = 0; i < this.allComments.length; i++){
      if(this.allComments[i].item == vehicle){
        this.cByVehicles.push(this.allComments[i])
      }
    }
    if(this.cByVehicles.length > 0){
    console.log(this.cByVehicles)

    var y =  document.getElementById("comments")
        y.style.display = "block";
    }
    var x =  document.getElementById("desc");
        x.style.display = "none";
  }
  
  addComment(event){
    
    this.cv = this.vehicleList[event.currentTarget.id];
    this.cvn = this.vehicleList[event.currentTarget.id].name;
    var x = document.getElementById("commentForm")
        x.style.display = "block"
    
  }
  closeCommentForm(){
    var x = document.getElementById("commentForm")
        x.style.display = "none"
  }
  submitComment(){
    var user = "Albert Li"
    var x = document.getElementById("commentInput").value
    var y = document.getElementById("ratingInput").value
    this.vehiclesService.postComment(x,y,this.cv._id, this.cvn)
    this.cByVehicles.push({
      item:this.cvn,
      user:user,
      comment:x,
      rating:y
    })
    console.log(x,y,this.cv._id,this.cvn)
  }
  fetchData(res){
   var i;
    for(i = 0; i < res.length; i++){
      console.log(res)
      
      if(JSON.stringify(this.vehicleList[i]) !== JSON.stringify(res[i]))
      this.vehicleList[i] = res[i]
    }
  }
  fetchComments(res){
    this.allComments = []
    this.cByVehicles = []
   var i;
    for(i = 0; i < res.length; i++){
      console.log(res)
      
      this.allComments.push(res[i]);
    }

    for(var i = 0; i < this.allComments.length; i++){
      if(this.cvn == this.allComments[i].item){
        this.cByVehicles.push(this.allComments[i])
      }
    }
  }
  
  updateData(){
     this.vehiclesService.getList(this.fetchData.bind(this))
     
  }
  updateComments(){
     this.vehiclesService.getComments(this.fetchComments.bind(this))
     
  }
  showManager(){
    var x = document.getElementById("menu")
        x.style.display = "block"

    
  }
  createItem(){

    var id = document.getElementById("idInput").value
    var name = document.getElementById("nameInput").value
    var price = document.getElementById("priceInput").value
    var quantity = document.getElementById("quantityInput").value
    var tax = document.getElementById("taxInput").value
    var horsePower = document.getElementById("horsePowerInput").value
    var seats = document.getElementById("seatsInput").value
    var topSpeed = document.getElementById("topSpeedInput").value
    var image = document.getElementById("imageInput").value
    
    var vehicle = {
      name:name,
      price:price,
      quantity:quantity,
      tax:tax,
      horsePower:horsePower,
      seats:seats,
      topSpeed:topSpeed,
      image:image
    }
    console.log(vehicle)
    this.vehiclesService.postItem(vehicle)

  }
  deleteItem(){
    var id = document.getElementById("idInput").value
    this.vehiclesService.deleteItem(id)
  }
  updateItem(){
    
    var id = document.getElementById("idInput").value
    var name = document.getElementById("nameInput").value
    var price = document.getElementById("priceInput").value
    var quantity = document.getElementById("quantityInput").value
    var tax = document.getElementById("taxInput").value
    var horsePower = document.getElementById("horsePowerInput").value
    var seats = document.getElementById("seatsInput").value
    var topSpeed = document.getElementById("topSpeedInput").value
    var image = document.getElementById("imageInput").value
    
    var vehicle = {
      _id:id,
      name:name,
      price:price,
      quantity:quantity,
      tax:tax,
      horsePower:horsePower,
      seats:seats,
      topSpeed:topSpeed,
      image:image
    }
    console.log(vehicle)
    this.vehiclesService.updateItem(vehicle)
  }
  closeManager(){
    
    var x = document.getElementById("menu")
        x.style.display = "none"
    var y = document.getElementById("menuButton")
        y.innerHTML = "manager"
  
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
    this.vehicleID = "Vehicle ID: "+vehicle._id
       var x =  document.getElementById("desc");
        x.style.display = "block";
       var y =  document.getElementById("comments")
        y.style.display = "none";
                      
}
  closeDesc(event){
   var x =  document.getElementById("desc");
        x.style.display = "none";
    
  }
 closeComments(event){
   var x =  document.getElementById("comments");
        x.style.display = "none";
    
  }
  
  addItem(event){

    var vehicle = this.vehicleList[event.currentTarget.id];
    var i = vehicle.name+'cartQ'


    if  (vehicle.quantity <= 0)
    alert ("error")
    else if(document.getElementById(i) == null){
    this.cartService.cartAdd(vehicle)

      vehicle.quantity = vehicle.quantity - 1;
      console.log(vehicle.quantity)
      this.vehiclesService.changeQuantity(vehicle.quantity,vehicle._id)//.subscribe(data => this.updateData())
      document.getElementById("withTax").innerHTML = parseInt(document.getElementById("withTax").innerHTML) + parseInt(vehicle.price *0.01 * (1+vehicle.tax))
      document.getElementById("withoutTax").innerHTML = parseInt(document.getElementById("withoutTax").innerHTML) + parseInt(vehicle.price)
      

      // vehicle.quantity = vehicle.quantity - 1;
  
    } 
    else
    {
      console.log(document.getElementById(i))
      document.getElementById(i).innerHTML = parseInt(document.getElementById(i).innerHTML) + 1 
      vehicle.quantity = vehicle.quantity - 1;
      console.log(vehicle.quantity)
      this.vehiclesService.changeQuantity(vehicle.quantity,vehicle._id)//.subscribe(data => this.updateData())
      document.getElementById("withTax").innerHTML = parseInt(document.getElementById("withTax").innerHTML) + parseInt(vehicle.price *0.01 * (1+vehicle.tax))
      document.getElementById("withoutTax").innerHTML = parseInt(document.getElementById("withoutTax").innerHTML) + parseInt(vehicle.price)
      
      console.log(this.vehicleList)


    }
    

  }

}