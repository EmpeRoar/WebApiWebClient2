"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
var CustomerService = (function () {
    function CustomerService(http) {
        this.http = http;
        //private _url = 'http://192.168.254.104:8090/api/employees';
        this._url = 'http://localhost:54092/api/customers';
    }
    CustomerService.prototype.getAll = function () {
        return this.http.get(this._url)
            .map(this.extractData)
            .catch(this.handleError);
    };
    CustomerService.prototype.getCustomer = function (id) {
        var url = this._url + "/" + id;
        return this.http.get(url)
            .map(this.processData)
            .catch(this.handleError);
    };
    CustomerService.prototype.addCustomer = function (customer) {
        var body = JSON.stringify(customer);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this._url, body, options)
            .map(this.processData)
            .catch(this.handleError);
    };
    CustomerService.prototype.updateCustomer = function (customer) {
        var body = JSON.stringify(customer);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        var url = this._url + "/" + customer.id;
        return this.http.put(url, body, options)
            .catch(this.handleError);
    };
    CustomerService.prototype.disableCustomer = function (customer) {
        var body = JSON.stringify(customer);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        var url = this._url + "/" + customer.id;
        return this.http.put(url, body, options)
            .catch(this.handleError);
    };
    CustomerService.prototype.processData = function (res) {
        var body = res.json();
        return body.data || {
            id: body.ID,
            FirstName: body.FirstName,
            MiddleName: body.MiddleName,
            LastName: body.LastName,
            Email: body.Email
        };
    };
    CustomerService.prototype.extractData = function (res) {
        var body = res.json();
        var customerList = [];
        for (var e in body) {
            var i = body[e];
            customerList.push({
                id: i.ID,
                FirstName: i.FirstName,
                MiddleName: i.MiddleName,
                LastName: i.LastName,
                Email: i.Email
            });
        }
        var customerTable = {
            totalCount: customerList.length,
            customers: customerList
        };
        return customerTable;
    };
    CustomerService.prototype.handleError = function (error) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable_1.Observable.throw(errMsg);
    };
    CustomerService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], CustomerService);
    return CustomerService;
}());
exports.CustomerService = CustomerService;
//# sourceMappingURL=customer.service.js.map