import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {
        vehicleNames = []
  constructor(private http: HttpClient) { }
    getList(callback) {
    
     var url= 'https://se3316-lab5-ali429-ali429.c9users.io:8081/api/vehicles'
    

      this.http.get(url).subscribe(data => {
          
          for(var i = 0; i < data.length; i++){
            if(data[i].name != undefined){
            this.vehicleNames.push(data[i])
            }
          }
          console.log(this.vehicleNames)
          callback(this.vehicleNames)
      });
  }
  getVehicle(callback, index){
    callback(this.vehicleNames[index]);
  }
  
  changeQuantity(amount, id){
       var url= 'https://se3316-lab5-ali429-ali429.c9users.io:8081/api/vehicles'+id
       this.http.put(url,{
         quantity:amount
       }).subscribe(
         res=> {
           console.log(res);
         },
         err=>{
           console.log("Error occured");
         })
  }
    
  
}
