import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
//import { UserComponent } from './user/user.component';
import {ExampleComponent } from './example/example.component';
@Component({
  selector: 'app-root',
  imports: [  ExampleComponent  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'

})
export class AppComponent {
  title = 'my-angular-app';

  Parentmsg: string | undefined = "This is parent"; 
  cmsg: string | undefined = "";
  parentFunc(x: string){
    this.cmsg= x;
  }
  

}
