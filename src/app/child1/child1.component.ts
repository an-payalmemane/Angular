import { Component , OnInit} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Route, Router, RouterLink, RouterLinkActive, RouterOutlet, ParamMap } from '@angular/router';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
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

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute) {
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
    const storedData = localStorage.getItem('submittedData');
    if (storedData) {
      this.submittedData = JSON.parse(storedData);
      if (this.editingIndex !== null && this.submittedData[this.editingIndex]) {
        this.patchForm(this.submittedData[this.editingIndex]);
      }
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

      const formData = this.form.value;
      let storedData = localStorage.getItem('submittedData');
      this.submittedData = storedData ? JSON.parse(storedData) : [];

      if (this.editingIndex !== null) {
        
        this.submittedData[this.editingIndex] = formData;
        this.editingIndex = null; 
      } else {
        
        this.submittedData.push(formData);
      }

      localStorage.setItem('submittedData', JSON.stringify(this.submittedData));
      alert('Form Submitted Successfully');

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
    if (!unit) return;
  
    this.form.patchValue({
      companyName: unit.companyName || 'gfhg',
      country: unit.country || '',
      street: unit.street || '',
      city: unit.city || '',
      pincode: unit.pincode || ''
    });
  
   
    this.units.clear();
  
    if (unit.units && unit.units.length > 0) {
      unit.units.forEach((u: any) => {
        const unitGroup = this.fb.group({
          unitName: [u.unitName || '', Validators.required],
          quantity: [u.quantity || 1, [Validators.required, Validators.min(1)]],
          unitPrice: [u.unitPrice || 0, [Validators.required, Validators.min(0)]],
          totalPrice: [{ value: u.totalPrice || 0, disabled: true }]
        });
  
        this.trackTotalPriceForUnit(unitGroup);
        this.units.push(unitGroup);
      });
    }
  }
  
}
