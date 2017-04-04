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
var CustomerEditComponent = (function () {
    function CustomerEditComponent(customerService, router, _fb, activatedRoute) {
        this.customerService = customerService;
        this.router = router;
        this._fb = _fb;
        this.activatedRoute = activatedRoute;
        this.id = 0;
        this.title = 'Edit Customer';
        this.events = [];
        this.mode = 'Observable';
    }
    CustomerEditComponent.prototype.ngOnDestroy = function () {
    };
    CustomerEditComponent.prototype.setForms = function (customer) {
        this.myForm.get('id').setValue(customer.id);
        this.myForm.get('FirstName').setValue(customer.FirstName);
        this.myForm.get('MiddleName').setValue(customer.MiddleName);
        this.myForm.get('LastName').setValue(customer.LastName);
        this.myForm.get('Email').setValue(customer.Email);
    };
    CustomerEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activatedRoute.params.subscribe(function (params) {
            _this.id = params['id'];
            _this.customerService.getCustomer(_this.id).subscribe(function (customer) { return _this.setForms(customer); }, function (error) { return _this.errorMessage = error; });
        });
        this.myForm = this._fb.group({
            id: [],
            FirstName: ['', [forms_1.Validators.required, forms_1.Validators.minLength(5)]],
            MiddleName: ['', [forms_1.Validators.required, forms_1.Validators.minLength(5)]],
            LastName: ['', [forms_1.Validators.required, forms_1.Validators.minLength(5)]],
            Email: ['', [forms_1.Validators.required, forms_1.Validators.minLength(5)]],
        });
        this.subcribeToFormChanges();
    };
    CustomerEditComponent.prototype.subcribeToFormChanges = function () {
        var _this = this;
        var myFormStatusChanges$ = this.myForm.statusChanges;
        var myFormValueChanges$ = this.myForm.valueChanges;
        myFormStatusChanges$.subscribe(function (x) { return _this.events.push({ event: 'STATUS_CHANGED', object: x }); });
        myFormValueChanges$.subscribe(function (x) { return _this.events.push({ event: 'VALUE_CHANGED', object: x }); });
    };
    CustomerEditComponent.prototype.redirectToList = function () {
        this.router.navigate(['/customers']);
    };
    CustomerEditComponent.prototype.save = function (model, isValid) {
        var _this = this;
        this.submitted = true;
        if (isValid) {
            console.log(model, isValid);
            this.customerService.updateCustomer(model).subscribe(function (customer) { return _this.redirectToList(); }, function (error) { return _this.errorMessage = error; });
        }
    };
    CustomerEditComponent.prototype.onSubmit = function () {
    };
    CustomerEditComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'customerNew.component.html',
            providers: [customer_service_1.CustomerService],
            directives: []
        }), 
        __metadata('design:paramtypes', [customer_service_1.CustomerService, router_1.Router, forms_1.FormBuilder, router_1.ActivatedRoute])
    ], CustomerEditComponent);
    return CustomerEditComponent;
}());
exports.CustomerEditComponent = CustomerEditComponent;
//# sourceMappingURL=customerEdit.component.js.map