import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-http-client',
  imports: [],
  templateUrl: './http-client.component.html',
  styleUrl: './http-client.component.css'
})
export class HttpClientComponent implements OnInit {
  apiURL:string= 'http://localhost:7000/api_conn.php'
  data: any;
  postData: any;
 
  constructor (private http: HttpClient) {}
  ngOnInit(){
    this.getValues();
   
  }
  getValues(){
    this.http.get("http://localhost:7000/api_conn.php").subscribe(res=>{
      console.log("Get data==",res);
      this.data=res;
    });
  }
  postValues(){
    this.http.post("https://api.restful-api.dev/objects", this.postData).subscribe(res=>{
      this.getValues();
      alert("Data posted successfully");
      console.log("Posted  data",res);
      


    });
  }
  // updateValues(id: string, updateData: any){
  //   this.http.put(`https://api.restful-api.dev/objects/${id}`,updateData).subscribe(res=>{
  //     console.log("updated data",res);
  //   });
  // }
  // deleteValues(id: string){
  //   this.http.delete(`https://api.restful-api.dev/objects/${id}`).subscribe(res=>{
  //     this.getValues();
  //     alert("Data deleted successfully");
  //     console.log("deleted data==",res);
  //   });
  // }
  // operation(){
  //   this.getValues();
  //   this.postValues();
  //   this.updateValues(this.id, this.updateData);
  //   this.deleteValues(this.id);
  // }

}
