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
var customer_service_1 = require('./customer.service');
var customer_1 = require('./customer');
var CustomerComponent = (function () {
    function CustomerComponent(customerService) {
        this.customerService = customerService;
        this.theader = [{
                colName: "id",
                colDisplay: "ID"
            }, {
                colName: "FirstName",
                colDisplay: "First Name"
            }, {
                colName: "MiddleName",
                colDisplay: "Middle Name"
            }, {
                colName: "LastName",
                colDisplay: "Last Name"
            }, {
                colName: "Email",
                colDisplay: "Email"
            }];
        this.totalResultPerPage = 25;
        this.imagelink = "images/img.jpe";
        this.title = 'Customers';
        this.mode = 'Observable';
    }
    CustomerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.customerService.getAll().subscribe(function (customerTable) { return _this.customerTable = _this.processResult(customerTable); }, function (error) { return _this.errorMessage = error; });
    };
    CustomerComponent.prototype.showPage = function (index) {
        var d = this.inMemoryData;
        var newd = [];
        for (var i in d) {
            if (d[i].p == parseInt(index)) {
                newd.push(d[i]);
            }
        }
        this.totalPages = Math.ceil(this.inMemoryData.length / this.totalResultPerPage);
        this.totalRemaining = this.inMemoryData.length % this.totalResultPerPage;
        this.displayData = newd;
        this.displayStatus = "Showing " + newd.length + " of " + d.length;
    };
    CustomerComponent.prototype.filterResult = function (event) {
        var str = this.searchString;
        var d = this.customerTable.customers;
        var newd = [];
        var itemCounter = 1;
        var pageCounter = 1;
        for (var i in d) {
            if (((typeof d[i].FirstName === 'string' || d[i] instanceof customer_1.Customer) && (d[i].FirstName.indexOf(str) !== -1)) ||
                ((typeof d[i].MiddleName === 'string' || d[i] instanceof customer_1.Customer) && (d[i].MiddleName.indexOf(str) !== -1)) ||
                ((typeof d[i].LastName === 'string' || d[i] instanceof customer_1.Customer) && (d[i].LastName.indexOf(str) !== -1))) {
                d[i].p = pageCounter;
                newd.push(d[i]);
                // assign page
                if (itemCounter >= this.totalResultPerPage) {
                    itemCounter = 1;
                    pageCounter++;
                }
                else {
                    itemCounter++;
                }
            }
        }
        this.inMemoryData = newd;
        this.totalPages = Math.ceil(newd.length / this.totalResultPerPage);
        this.totalRemaining = newd.length % this.totalResultPerPage;
        this.showPage(1);
    };
    CustomerComponent.prototype.processResult = function (customerTable) {
        var rowList = [];
        var count = 0;
        var itemCounter = 1;
        var pageCounter = 1;
        for (var i in customerTable.customers) {
            //if(count<=this.limitPerPage){
            rowList.push({
                id: customerTable.customers[i].id,
                FirstName: customerTable.customers[i].FirstName,
                MiddleName: customerTable.customers[i].MiddleName,
                LastName: customerTable.customers[i].LastName,
                Email: customerTable.customers[i].Email,
                p: pageCounter
            });
            //}         
            count++;
            // assign page
            if (itemCounter >= this.totalResultPerPage) {
                itemCounter = 1;
                pageCounter++;
            }
            else {
                itemCounter++;
            }
        }
        var showing = customerTable.totalCount / 2;
        this.inMemoryData = rowList;
        this.showPage(1);
        return {
            showingCount: showing,
            totalCount: customerTable.totalCount,
            customers: rowList
        };
    };
    CustomerComponent.prototype.disable = function (id) {
        var _this = this;
        var c = this.customerTable.customers.filter(function (customer) { return customer.id === id; });
        this.customer = {
            id: c[0].id,
            FirstName: c[0].FirstName,
            MiddleName: c[0].MiddleName,
            LastName: c[0].LastName,
            Email: c[0].Email,
            p: 1,
            CustomerStatus: 1
        };
        this.customerService.disableCustomer(this.customer).subscribe(function (data) { return _this.reloadTable(_this.customer); }, function (error) { return _this.errorMessage = error; });
    };
    CustomerComponent.prototype.reloadTable = function (customer) {
        this.customerTable.customers = this.customerTable.customers.filter(function (el) { return el.id !== customer.id; });
        this.customerTable.totalCount -= 1;
        this.processResult(this.customerTable);
    };
    CustomerComponent.prototype.onSubmit = function () {
        var _this = this;
        this.customerService.addCustomer(this.customer).subscribe(function (customer) { return _this.pushNewCustomer(customer); }, function (error) { return _this.errorMessage = error; });
    };
    CustomerComponent.prototype.pushNewCustomer = function (customer) {
        this.customerTable.customers.push(customer);
        this.customerTable.totalCount += 1;
        this.processResult(this.customerTable);
    };
    CustomerComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'customerTable.component.html',
            providers: [customer_service_1.CustomerService],
            directives: []
        }), 
        __metadata('design:paramtypes', [customer_service_1.CustomerService])
    ], CustomerComponent);
    return CustomerComponent;
}());
exports.CustomerComponent = CustomerComponent;
//# sourceMappingURL=customer.component.js.map