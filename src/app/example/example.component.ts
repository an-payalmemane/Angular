import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, FormArray, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-example',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './example.component.html',
  styleUrl: './example.component.css'
})
export class ExampleComponent implements OnInit {
    form: FormGroup;
    table: boolean = false;
    submittedData:any[] = [];
  
    constructor(private fb: FormBuilder) {
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
        this.submittedData.push(this.form.value);  
        localStorage.setItem('submittedData', JSON.stringify(this.submittedData));
        alert('Form Submitted Successfully');
        this.units.clear();
        this.addUnit();
        this.form.reset();
        this.table = true;
      }
    }
  
    ShowTable() {
      this.enableTotalPriceFields();
      this.table = !this.table;
    }
  
    enableTotalPriceFields(): void {
      this.units.controls.forEach((unit) => {
        unit.get('totalPrice')?.enable();
      });
    }
    patchForm(unit: any): void {
      this.form.patchValue({
        companyName: unit.companyName,
        country: unit.country,
        street: unit.street,
        city: unit.city,
        pincode: unit.pincode
      });
  
      this.units.clear();
      unit.units.forEach((u: any) => {
        this.units.push(
          this.fb.group({
            unitName: [u.unitName, Validators.required],
            quantity: [u.quantity, [Validators.required, Validators.min(1)]],
            unitPrice: [u.unitPrice, [Validators.required, Validators.min(0)]],
            totalPrice: [{ value: u.totalPrice, disabled: true }]
          })
        );
      });
    }
  }
  
