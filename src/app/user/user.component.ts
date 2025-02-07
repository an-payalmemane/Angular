import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import {FormsModule, ReactiveFormsModule, FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms';

import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-user',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent  {
  // name1 = 'John Doe';
  // color = 'blue';
  // email1 = '';
  // userFunc(){
  //   //alert( "Hello User");
  //   alert("Hello User");
  // }
  // textColor= 'red';
  // fontSize= '30px';
  // isHighlight= false;
  // isBold=false;
  // toggle(){
  //   this.isHighlight= !this.isHighlight;
  //   this.isBold = !this.isBold;
  // }
  // Fruits=["apple", "Banana", "Mango", "Pineaple"];
  // isVisible=false;
  // textFunc(){
  //   this.isVisible=!this.isVisible;
  // }
  // @Input() msg: string | undefined;
  // @Output() childmsg = new EventEmitter<string>();

  // msgFunc(){
  //   this.childmsg.emit("This is child.");
  // }
  
  user = new FormGroup({
    name: new FormControl("",[Validators.required, Validators.minLength(3)]),
    username: new FormControl("",[Validators.required,Validators.minLength(5)]),
    email: new FormControl("",[Validators.required, Validators.email]),
    password: new FormControl("",[Validators.required, Validators.minLength(8)]),
    confirmPass: new FormControl("",[Validators.required, Validators.minLength(8)])
  });
  passwordsMatch(): boolean {
    return this.user.get('password')?.value === this.user.get('confirmPass')?.value;
  }
  get formControls(){
    return this.user.controls;

  }
  
  userForm(){
    if(this.user.valid){
      alert("Login SuccessFully ");
    }
    
    this.user.reset();
  }

  private fb= inject(FormBuilder);
  registerForm = this.fb.group({
    name: ['', Validators.required],
    username: ['', [Validators.required, Validators.minLength(5)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPass: ['', [Validators.required, Validators.minLength(8)]]
  });
  get formControls1(){
    return this.registerForm.controls;

  }
  passwordsMatch1(): boolean {
    return this.registerForm.get('password')?.value === this.registerForm.get('confirmPass')?.value;
  }
  userForm1(){
    if(this.registerForm.valid){
      alert("Login SuccessFully ");
    }

    this.registerForm.reset();
  }
}

