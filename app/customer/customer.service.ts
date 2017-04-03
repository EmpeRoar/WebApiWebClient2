import { Injectable } from '@angular/core'
import { Jsonp, URLSearchParams, Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable }       from 'rxjs/Observable';
import { Customer } from './customer';
import { CustomerTable } from './customerTable';

@Injectable()
export class CustomerService{
   constructor(private http: Http) { } 
   //private _url = 'http://192.168.254.104:8090/api/employees';
   private _url = 'http://localhost:54092/api/customers';
   
  private customer:Customer;
  
  getAll(): Observable<CustomerTable> {
            return this.http.get(this._url)
                    .map(this.extractData)                    
                    .catch(this.handleError);
     
  }

  getCustomer (id: number): Observable<Customer> {
    
    let url = `${this._url}/${id}`;    
    return this.http.get(url)
                    .map(this.processData)
                    .catch(this.handleError);
    
    
    
  }

  addCustomer (customer: Customer): Observable<Customer> {
    let body = JSON.stringify(customer);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });    
    return this.http.post(this._url, body, options)
                    .map(this.processData)
                    .catch(this.handleError);
  }

 
  updateCustomer (customer: Customer): Observable<Customer> {
    let body = JSON.stringify(customer);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });  
    let url = `${this._url}/${customer.id}`;    

    return this.http.put(url, body, options)
                    .catch(this.handleError);
  }
  
  disableCustomer (customer: Customer): Observable<Customer> {
    let body = JSON.stringify(customer);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });  
    let url = `${this._url}/${customer.id}`;    

    return this.http.put(url, body, options)
                    .catch(this.handleError);
  }
  

  

  private processData(res: Response) {    
    let body = res.json();       
    return body.data || {
      id:body.ID,
      FirstName:body.FirstName,
      MiddleName:body.MiddleName,
      LastName:body.LastName,
      Email:body.Email  
    };
  }

  private extractData(res: Response) {
    
    let body = res.json();    

    var customerList = [];
    
    for(var e in body){
        var i = body[e];
        customerList.push(
            {
                id:i.ID,
                FirstName:i.FirstName,
                MiddleName:i.MiddleName,
                LastName:i.LastName,
                Email:i.Email                            
            }
        );
    }
    
    var customerTable = {
        totalCount : customerList.length,
        customers : customerList
    }
   
    return customerTable;
  }
  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

}