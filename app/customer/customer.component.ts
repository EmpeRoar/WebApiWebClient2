import { Component } from '@angular/core';
import { Observable }       from 'rxjs/Observable';
import { CustomerService } from './customer.service';
import { Customer } from './customer';
import { CustomerTable } from './customerTable';

@Component({   
  moduleId: module.id,
  templateUrl: 'customerTable.component.html',
  providers: [CustomerService],
  directives: []
})
export class CustomerComponent {
  
  theader = [{
        colName:"id",
        colDisplay:"ID"
    },{
        colName:"FirstName",
        colDisplay:"First Name"
    },{
        colName:"MiddleName",
        colDisplay:"Middle Name"
    },{
        colName:"LastName",
        colDisplay:"Last Name"
    },{
        colName:"Email",
        colDisplay:"Email"
    }];   
    totalResultCount:number;
    totalResultPerPage:number = 25;
    totalRemaining:number;
    totalPages:number;
    searchString:string;
    displayStatus:string;
    displayData:Customer[];
    inMemoryData:Customer[];
    

  constructor(private customerService:CustomerService){}

  ngOnInit(){

     this.customerService.getAll().subscribe(                       
                 customerTable => this.customerTable = this.processResult(customerTable),                        
                 error =>  this.errorMessage = <any>error);
    
  }

  

   showPage(index){       
        var  d = this.inMemoryData;               
        var newd = [];
        for(var i in d){    
            if(d[i].p==parseInt(index)){
              newd.push(d[i]);      
            }
        }        
        this.totalPages = Math.ceil(this.inMemoryData.length / this.totalResultPerPage);
        this.totalRemaining = this.inMemoryData.length % this.totalResultPerPage;
        this.displayData = newd;
        this.displayStatus = "Showing " + newd.length + " of " + d.length;

    }
    filterResult(event:any) {
       
        var str = this.searchString;
        var d = this.customerTable.customers;
        var newd = [];
       
       
        var itemCounter = 1;
        var pageCounter = 1;                
        for(let i in d){
          if(
            ((typeof d[i].FirstName === 'string' || d[i] instanceof Customer) && (d[i].FirstName.indexOf(str)!==-1)) ||
            ((typeof d[i].MiddleName === 'string' || d[i] instanceof Customer) && (d[i].MiddleName.indexOf(str)!==-1)) ||
            ((typeof d[i].LastName === 'string' || d[i] instanceof Customer) && (d[i].LastName.indexOf(str)!==-1))

          
          ){               
               d[i].p = pageCounter;
               newd.push(d[i]);

               // assign page
               if(itemCounter >= this.totalResultPerPage){
                   itemCounter=1;
                   pageCounter++;

               }else{
                   itemCounter++;
               }               
          }
        }

        this.inMemoryData = newd;
        this.totalPages = Math.ceil(newd.length / this.totalResultPerPage);
        this.totalRemaining = newd.length % this.totalResultPerPage;
        this.showPage(1);
    }
    

  imagelink = "images/img.jpe"; 
  note;

  title = 'Customers';   
  customers: Customer[];
  customer:Customer;  
  customerTable:CustomerTable;
  mode = 'Observable';  
  errorMessage;
  processResult(customerTable:CustomerTable){

      var rowList = [];
      var count:number = 0; 

      var itemCounter = 1;
      var pageCounter = 1;    

      for(var i in customerTable.customers){
          //if(count<=this.limitPerPage){

            
            rowList.push({
              id : customerTable.customers[i].id,
              FirstName : customerTable.customers[i].FirstName,
              MiddleName : customerTable.customers[i].MiddleName,
              LastName : customerTable.customers[i].LastName,
              Email : customerTable.customers[i].Email,
              p: pageCounter
            });
          //}         
          count++; 

           // assign page
           if(itemCounter >= this.totalResultPerPage){
             itemCounter=1;
             pageCounter++;
           }else{
             itemCounter++;
           }
         
      }

      var showing = customerTable.totalCount / 2;
   
      this.inMemoryData = rowList;
      this.showPage(1);

      return {
        showingCount : showing,
        totalCount : customerTable.totalCount,
        customers : rowList
      }
  }
  
  

  
  disable(id){
     
    var c = this.customerTable.customers.filter(customer => customer.id === id);
    
    this.customer = {
         id:c[0].id,
         FirstName:c[0].FirstName,
         MiddleName:c[0].MiddleName,
         LastName:c[0].LastName,
         Email:c[0].Email,
         p:1,
         CustomerStatus:1
      };

    this.customerService.disableCustomer(this.customer).subscribe(
                  data => this.reloadTable(this.customer),                
                  error =>  this.errorMessage = <any>error); 

  }

  reloadTable(customer:Customer){    
    this.customerTable.customers = this.customerTable.customers.filter(function(el){ return el.id !== customer.id});
    this.customerTable.totalCount -= 1;              
    this.processResult(this.customerTable);
  }


  onSubmit(){           
     
      this.customerService.addCustomer(this.customer).subscribe(
                 customer => this.pushNewCustomer(customer),                
                 error =>  this.errorMessage = <any>error);   
    
  }

  pushNewCustomer(customer:Customer){    
    
      this.customerTable.customers.push(customer)
      this.customerTable.totalCount += 1;              
      this.processResult(this.customerTable);

  }

  

 
}

