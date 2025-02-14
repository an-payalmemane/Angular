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
  postData: any;
  id: number= 2;
  updateData: any;
 
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
    this.deleteValues(this.id);
  }

}
