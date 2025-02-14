import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private apiUrl = 'http://localhost:4000/api_conn.php'; // Example API
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' }); // Define headers

  constructor(private http: HttpClient) { }

  // GET request
  getData() {
    return this.http.get(this.apiUrl);
  }

  getDataById(id: number) {
    return this.http.get(`${this.apiUrl}?id=${id}`);
  }

  // POST request
  createData(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  // PUT request (Updating entire resource)
  updateData(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}?id=${id}`, data);
  } 

  patchData(id: number, partialData: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}`, partialData);
  }
  deleteData(id: number) {
    return this.http.delete(`${this.apiUrl}?id=${id}`, { headers: this.headers });
  }

}
