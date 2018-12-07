import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {
        public tempVehicles = []
        vehicleNames = []
        commentArray = []
  constructor(private http: HttpClient) { }
  
    getList(callback) {
    this.vehicleNames = [];
     var url= 'https://se3316-lab5-ali429-ali429.c9users.io:8081/api/vehicles'
    

      this.http.get(url).subscribe(data => {
          
          for(var i = 0; i < data.length; i++){
            if(data[i].name != undefined){
            this.vehicleNames.push(data[i])
            this.tempVehicles.push(data[i])
            }
          }
          console.log(this.vehicleNames)
          console.log(this.tempVehicles)
          callback(this.vehicleNames)
      });
  }
  getComments(callback){
      this.commentArray = [];
     var url= 'https://se3316-lab5-ali429-ali429.c9users.io:8081/api/comments'
    

      this.http.get(url).subscribe(data => {
          
          for(var i = 0; i < data.length; i++){
            if(data[i].item != undefined){
            this.commentArray.push(data[i])
            }
          }
          console.log(this.commentArray)
          callback(this.commentArray)
          
      });
      
  }
  getVehicle(callback, index){
    callback(this.vehicleNames[index]);
  }

  postComment(comment, rating, id, name){
      var user = "Albert Li"
       var url = 'https://se3316-lab5-ali429-ali429.c9users.io:8081/api/comments/'
       this.http.post(url,{
         rating:rating,
         comment:comment,
         user: user,
         item:name
       }).subscribe(
         res=> {
             console.log('here');
         },
         err=>{
           console.log(err)
         })
  }
  
  changeQuantity(amount, id){
    console.log(amount, id)
       var url = 'https://se3316-lab5-ali429-ali429.c9users.io:8081/api/vehicles/'+id
       this.http.put(url,{
         quantity:amount
       }).subscribe(
         res=> {
             console.log('here');
         },
         err=>{
           console.log(err)
         })
  }
  postItem(vehicle){
      
      console.log(vehicle)

       var url = 'https://se3316-lab5-ali429-ali429.c9users.io:8081/api/vehicles'
       this.http.post(url,{
         name:vehicle.name,
         price:vehicle.price,
         quantity:vehicle.quantity,
         tax:vehicle.tax,
         horsePower:vehicle.horsePower,
         seats:vehicle.seats,
         topSpeed:vehicle.topSpeed,
         image:vehicle.image
       }).subscribe(
         res=> {
             console.log('here');
         },
         err=>{
           console.log(err)
         })
    
  }
    updateItem(vehicle){
      
      console.log(vehicle)
    
       var url = 'https://se3316-lab5-ali429-ali429.c9users.io:8081/api/vehicles/'+vehicle._id
       this.http.put(url,{
         name:vehicle.name,
         price:vehicle.price,
         quantity:vehicle.quantity,
         tax:vehicle.tax,
         horsePower:vehicle.horsePower,
         seats:vehicle.seats,
         topSpeed:vehicle.topSpeed,
         image:vehicle.image
       }).subscribe(
         res=> {
             console.log('here');
         },
         err=>{
           console.log(err)
         })
    
    }
    deleteItem(vehicle){

       var url = 'https://se3316-lab5-ali429-ali429.c9users.io:8081/api/vehicles/'+vehicle
       this.http.delete(url).subscribe(
         res=> {
             console.log('here');
         },
         err=>{
           console.log(err)
         })
  }
    
  
}
