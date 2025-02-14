import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CompanyService } from '../company.service';
//import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-child2',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './child2.component.html',
  styleUrl: './child2.component.css'
})
export class Child2Component implements OnInit {
  submittedData: any[] = [];
  data: any;

  constructor(private router: Router, private http: CompanyService) { }

  ngOnInit() {
    this.getValues();
    

  }

  // ngOnInit(): void {
  //   const data = localStorage.getItem('submittedData');
  //   if (data) {
  //     this.submittedData = JSON.parse(data);
  //   }
  // }

  patchForm(id: number): void {

    this.router.navigate(['/child1', id]);
    this.http.getDataById(id).subscribe(res => {
      console.log(res);
    });

  }


  getValues() {
    this.http.getData().subscribe(res => {
      this.data = res;
    });
  }

  
  deleteValues(id: number) {
    console.log("Deleting ID:", id); // Debugging

    if (confirm("Are you sure you want to delete this item?")) {
      this.http.deleteData(id).subscribe(res => {
          
          if ((res as any).success) {
            alert("Data deleted successfully!");
            this.data = this.data.filter((item: any) => item.id !== id);
            console.log("jgcjfjygu====");
          } else {
            alert("Failed to delete data!");
          }

        });
    }
  }


}

