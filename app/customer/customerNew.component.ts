import { Component } from '@angular/core';
import { Observable }       from 'rxjs/Observable';
import { CustomerService } from './customer.service';
import { Customer } from './customer';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({   
  moduleId: module.id,
  templateUrl: 'customerNew.component.html',
  providers: [CustomerService],
  directives: []
})
export class CustomerNewComponent {
  title = 'New Customer';
  private customer:Customer;
  public myForm: FormGroup;
  public submitted: boolean;
  public events: any[] = [];
  mode = 'Observable';  
  errorMessage;
  constructor(private customerService:CustomerService,private router: Router,private _fb: FormBuilder){}

  ngOnInit(){

       this.myForm = this._fb.group({
            FirstName: ['', [<any>Validators.required, <any>Validators.minLength(5)]],            
            MiddleName: ['', [<any>Validators.required, <any>Validators.minLength(5)]],            
            LastName: ['', [<any>Validators.required, <any>Validators.minLength(5)]],            
            Email: ['', [<any>Validators.required, <any>Validators.minLength(5)]],            
        });
       this.subcribeToFormChanges();
  }    

  subcribeToFormChanges() {
        const myFormStatusChanges$ = this.myForm.statusChanges;
        const myFormValueChanges$ = this.myForm.valueChanges;
        
        myFormStatusChanges$.subscribe(x => this.events.push({ event: 'STATUS_CHANGED', object: x }));
        myFormValueChanges$.subscribe(x => this.events.push({ event: 'VALUE_CHANGED', object: x }));
   }

   redirectToList(){
     this.router.navigate(['/customers']);
   }
 
  save(model: Customer, isValid: boolean) {
        this.submitted = true;
        console.log(model, isValid);

        if(isValid){
             
             this.customerService.addCustomer(model).subscribe(
                 customer => this.redirectToList(),                
                 error =>  this.errorMessage = <any>error);   
    
        }
  }

  onSubmit(){           
     

  }

  

 
 
}

