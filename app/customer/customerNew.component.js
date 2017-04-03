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
var router_1 = require('@angular/router');
var forms_1 = require('@angular/forms');
var CustomerNewComponent = (function () {
    function CustomerNewComponent(customerService, router, _fb) {
        this.customerService = customerService;
        this.router = router;
        this._fb = _fb;
        this.title = 'New Customer';
        this.events = [];
        this.mode = 'Observable';
    }
    CustomerNewComponent.prototype.ngOnInit = function () {
        this.myForm = this._fb.group({
            FirstName: ['', [forms_1.Validators.required, forms_1.Validators.minLength(5)]],
            MiddleName: ['', [forms_1.Validators.required, forms_1.Validators.minLength(5)]],
            LastName: ['', [forms_1.Validators.required, forms_1.Validators.minLength(5)]],
            Email: ['', [forms_1.Validators.required, forms_1.Validators.minLength(5)]],
        });
        this.subcribeToFormChanges();
    };
    CustomerNewComponent.prototype.subcribeToFormChanges = function () {
        var _this = this;
        var myFormStatusChanges$ = this.myForm.statusChanges;
        var myFormValueChanges$ = this.myForm.valueChanges;
        myFormStatusChanges$.subscribe(function (x) { return _this.events.push({ event: 'STATUS_CHANGED', object: x }); });
        myFormValueChanges$.subscribe(function (x) { return _this.events.push({ event: 'VALUE_CHANGED', object: x }); });
    };
    CustomerNewComponent.prototype.redirectToList = function () {
        this.router.navigate(['/customers']);
    };
    CustomerNewComponent.prototype.save = function (model, isValid) {
        var _this = this;
        this.submitted = true;
        console.log(model, isValid);
        if (isValid) {
            this.customerService.addCustomer(model).subscribe(function (customer) { return _this.redirectToList(); }, function (error) { return _this.errorMessage = error; });
        }
    };
    CustomerNewComponent.prototype.onSubmit = function () {
    };
    CustomerNewComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'customerNew.component.html',
            providers: [customer_service_1.CustomerService],
            directives: []
        }), 
        __metadata('design:paramtypes', [customer_service_1.CustomerService, router_1.Router, forms_1.FormBuilder])
    ], CustomerNewComponent);
    return CustomerNewComponent;
}());
exports.CustomerNewComponent = CustomerNewComponent;
//# sourceMappingURL=customerNew.component.js.map