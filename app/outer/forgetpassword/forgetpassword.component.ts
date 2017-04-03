import { Component } from '@angular/core';
@Component({
   moduleId: module.id,
   templateUrl: 'forgetpassword.component.html'
})
export class ForgetpasswordComponent {
  title = 'Forget Password';
  
  email:string;    

  constructor(){

  } 
  onSubmit(){           
     console.log(this.email);    
  }

}

