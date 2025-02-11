import { Component,OnInit } from '@angular/core';
import {ActivatedRoute, Route, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-child2',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './child2.component.html',
  styleUrl: './child2.component.css'
})
export class Child2Component implements OnInit {
  submittedData: any[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    const data = localStorage.getItem('submittedData');
    if (data) {
      this.submittedData = JSON.parse(data);
    }
  }

  patchForm(index: number): void {
    this.router.navigate(['/child1', index]); // Navigate with index as param
  }
}
