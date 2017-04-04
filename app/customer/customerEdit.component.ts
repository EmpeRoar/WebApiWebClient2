import {OnInit, OnDestroy, Component, Input } from '@angular/core';
import { Observable }       from 'rxjs/Observable';
import { CustomerService } from './customer.service';
import { Customer } from './customer';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({   
  moduleId: module.id,
  templateUrl: 'customerNew.component.html',
  providers: [CustomerService],
  directives: []
})
export class CustomerEditComponent implements OnInit, OnDestroy {

  
  id: number = 0;
  title = 'Edit Customer';
  public customer:Customer;
  public myForm: FormGroup;
  public submitted: boolean;
  public events: any[] = [];
  mode = 'Observable';  
  errorMessage;

  constructor(
        private customerService:CustomerService,
        private router: Router,
        private _fb: FormBuilder,
        private activatedRoute: ActivatedRoute){}
  
  ngOnDestroy(){

  }

  setForms(customer:Customer){
      this.myForm.get('id').setValue(customer.id);
      this.myForm.get('FirstName').setValue(customer.FirstName);
      this.myForm.get('MiddleName').setValue(customer.MiddleName);
      this.myForm.get('LastName').setValue(customer.LastName);
      this.myForm.get('Email').setValue(customer.Email);
  }

  ngOnInit(){

     this.activatedRoute.params.subscribe((params: Params) => {        
         
         this.id = params['id'];        
         this.customerService.getCustomer(this.id).subscribe(
                 customer => this.setForms(customer),                
                 error =>  this.errorMessage = <any>error);   

      });
     

      this.myForm = this._fb.group({ 
            id:[],          
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
       

        if(isValid){
              console.log(model, isValid);
             this.customerService.updateCustomer(model).subscribe(
                 customer => this.redirectToList(),                
                 error =>  this.errorMessage = <any>error);   
    
        }
  }

  onSubmit(){           
     

  }

  

 
 
}

