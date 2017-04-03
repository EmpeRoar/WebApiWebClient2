"use strict";
var router_1 = require('@angular/router');
var login_component_1 = require('./outer/login/login.component');
var signup_component_1 = require('./outer/signup/signup.component');
var forgetpassword_component_1 = require('./outer/forgetpassword/forgetpassword.component');
var menu_component_1 = require('./shared/menu/menu.component');
var header_component_1 = require('./shared/header/header.component');
var dashboard_component_1 = require('./dashboard/dashboard.component');
var customer_component_1 = require('./customer/customer.component');
var customerNew_component_1 = require('./customer/customerNew.component');
var customerEdit_component_1 = require('./customer/customerEdit.component');
var notfound_component_1 = require('./notfound/notfound.component');
var appRoutes = [
    {
        path: '',
        redirectTo: '/admin',
        pathMatch: 'full'
    },
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'signup', component: signup_component_1.SignupComponent },
    { path: 'forgetpassword', component: forgetpassword_component_1.ForgetpasswordComponent },
    { path: 'admin', children: [
            { path: '', component: header_component_1.HeaderComponent, outlet: 'header' },
            { path: '', component: dashboard_component_1.DashboardComponent },
            { path: '', component: menu_component_1.MenuComponent, outlet: 'menu' },
        ] },
    { path: 'customers', children: [
            { path: '', component: header_component_1.HeaderComponent, outlet: 'header' },
            { path: '', component: customer_component_1.CustomerComponent },
            { path: '', component: menu_component_1.MenuComponent, outlet: 'menu' },
        ] },
    { path: 'customers/new', children: [
            { path: '', component: header_component_1.HeaderComponent, outlet: 'header' },
            { path: '', component: customerNew_component_1.CustomerNewComponent },
            { path: '', component: menu_component_1.MenuComponent, outlet: 'menu' },
        ] },
    { path: 'customers/edit/:id', children: [
            { path: '', component: header_component_1.HeaderComponent, outlet: 'header' },
            { path: '', component: customerEdit_component_1.CustomerEditComponent },
            { path: '', component: menu_component_1.MenuComponent, outlet: 'menu' },
        ] },
    { path: '404', component: notfound_component_1.NotFoundComponent },
    { path: '**', redirectTo: '/404' }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map