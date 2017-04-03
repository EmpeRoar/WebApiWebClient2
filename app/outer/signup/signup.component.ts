import { Component } from '@angular/core';
@Component({
   moduleId: module.id,
   templateUrl: 'signup.component.html'
})
export class SignupComponent {
  title = 'Signup';
  
  username:string;
  password:string;
  confirmPassword:string;  

  constructor(){

  } 
  onSubmit(){           
     console.log(this.username + this.password + this.confirmPassword);    
  }


}

