import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CompanyService } from '../company.service';
@Component({
  selector: 'app-http-client',
  imports: [],
  templateUrl: './http-client.component.html',
  styleUrl: './http-client.component.css'
})
export class HttpClientComponent implements OnInit {
 
  data: any;
  postData: any={
    "name": "Apple MacBook Pro 16",
    "data": {
       "year": 2019,
       "price": 1849.99,
       "CPU model": "Intel Core i9",
       "Hard disk size": "1 TB"
    }
 };
  id: number= 2;
  D_id : number = 7;
  updateData: any = {
    "name": "Apple MacBook Pro 16",
    "data": {
       "year": 2019,
       "price": 2049.99,
       "CPU model": "Intel Core i9",
       "Hard disk size": "1 TB",
       "color": "silver"
    }
 };
 
  constructor (private http: CompanyService) {}
  ngOnInit(){
    this.getValues();
   
  }
  getValues(){
    this.http.getData().subscribe(res=>{
      console.log("Get data==",res);
      this.data=res;
    });
  }
  postValues(){
    this.http.createData(this.postData).subscribe(res=>{
      this.getValues();
      alert("Data posted successfully");
      console.log("Posted  data",res);
      


    });
  }
  updateValues(id: number, updateData: any){
    this.http.updateData(id,updateData).subscribe(res=>{
      console.log("updated data",res);
    });
  }
  deleteValues(id: number){
    this.http.deleteData(id).subscribe(res=>{
      this.getValues();
      alert("Data deleted successfully");
      console.log("deleted data==",res);
    });
  }
  operation(){
    this.getValues();
    this.postValues();
    this.updateValues(this.id, this.updateData);
    this.deleteValues(this.D_id);
  }

}
