import { Component, OnInit } from '@angular/core';
//import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Route, Router, RouterLink, RouterLinkActive, RouterOutlet, ParamMap } from '@angular/router';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CompanyService } from '../company.service';
@Component({
  selector: 'app-child1',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './child1.component.html',
  styleUrl: './child1.component.css'
})
export class Child1Component implements OnInit {
  form: FormGroup;
  table: boolean = false;
  submittedData: any[] = [];
  editingIndex: number | null = null;
  
  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private http: CompanyService) {
    this.form = this.fb.group({
      companyName: ['', Validators.required],
      country: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      pincode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
      units: this.fb.array([this.createUnit()])
    });
  }

  get units(): FormArray {
    return this.form.get('units') as FormArray;
  }

  ngOnInit(): void {
    this.trackTotalPrice();
   

    // Retrieve data from paramMap
    this.route.paramMap.subscribe((params: ParamMap) => {
      const index: string | null = params.get('index');
      if (index !== null) {
        this.editingIndex = +index;
        this.loadData();
      }
    });
  }
  loadData(): void { 
      if (this.editingIndex !== null ) {
        this.http.getDataById(this.editingIndex).subscribe((res: any) => {
          this.patchForm(res);
          console.log(res);
        });
      }
  }

  createUnit(): FormGroup {
    return this.fb.group({
      unitName: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      unitPrice: [0, [Validators.required, Validators.min(0)]],
      totalPrice: [{ value: 0, disabled: true }]
    });
  }

  addUnit(): void {
    const unitGroup = this.createUnit();
    this.units.push(unitGroup);
    this.trackTotalPriceForUnit(unitGroup);
  }

  removeUnit(index: number): void {
    this.units.removeAt(index);
  }

  trackTotalPrice(): void {
    this.units.controls.forEach((unit) => {
      this.trackTotalPriceForUnit(unit as FormGroup);
    });
  }

  trackTotalPriceForUnit(unit: FormGroup): void {
    unit.get('quantity')?.valueChanges.subscribe(() => this.updateTotalPrice(unit));
    unit.get('unitPrice')?.valueChanges.subscribe(() => this.updateTotalPrice(unit));
  }

  updateTotalPrice(unit: FormGroup): void {
    const quantity = unit.get('quantity')?.value || 0;
    const unitPrice = unit.get('unitPrice')?.value || 0;
    const totalPrice = quantity * unitPrice;
    unit.get('totalPrice')?.setValue(totalPrice);
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.enableTotalPriceFields();

      if(this.editingIndex == null){
        this.postValues();
      }
      else if (this.editingIndex !== null) {

        this.http.updateData(this.editingIndex, this.form.value).subscribe(res=>{
          console.log(res);
        });
         
      } 
      this.units.clear();
      this.addUnit();
      this.form.reset();
      this.table = true;
    }
  }


  enableTotalPriceFields(): void {
    this.units.controls.forEach((unit) => {
      (unit as FormGroup).get('totalPrice')?.enable();
    });
  }
  patchForm(unit: any): void {
    this.form.patchValue({
      companyName: unit.company_name || '',
      country: unit.country || '',
      street: unit.street ||'',
      city: unit.city ||'',
      pincode: unit.zipcode ||''
    });
    this.units.clear();
    unit.units.forEach((u: any) => {
      const unitGroup = this.createUnit();
      unitGroup.patchValue({
        unitName: u.unit_name,
        quantity: u.quantity,
        unitPrice: u.price,
        totalPrice: u.total_price
      });
      
      this.trackTotalPriceForUnit(unitGroup);
      this.units.push(unitGroup);
    });
    
  }
  postValues() {
      this.http.createData(this.form.value).subscribe(res => {
        
          alert("Data posted successfully");
        
        console.log("Posted  data", res);
  
      });
    }

}

