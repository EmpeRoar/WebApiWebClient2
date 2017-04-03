import { Routes, RouterModule, ActivatedRoute, Params } from '@angular/router';

import { LoginComponent } from './outer/login/login.component';
import { SignupComponent } from './outer/signup/signup.component';
import { ForgetpasswordComponent } from './outer/forgetpassword/forgetpassword.component';

import { MenuComponent } from './shared/menu/menu.component';
import { HeaderComponent } from './shared/header/header.component';

import { DashboardComponent } from './dashboard/dashboard.component';

import { CustomerComponent } from './customer/customer.component';
import { CustomerNewComponent } from './customer/customerNew.component';
import { CustomerEditComponent } from './customer/customerEdit.component';

import { NotFoundComponent } from './notfound/notfound.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/admin',
    pathMatch: 'full'    
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent},
  { path: 'forgetpassword', component: ForgetpasswordComponent },
  { path: 'admin', children:[
     { path: '' , component: HeaderComponent, outlet: 'header'},
     { path: '', component: DashboardComponent},          
     { path: '' , component: MenuComponent, outlet: 'menu'},     
  ]},  
  { path: 'customers', children:[
     { path: '' , component: HeaderComponent, outlet: 'header'},
     { path: '', component: CustomerComponent},      
     { path: '' , component: MenuComponent, outlet: 'menu'},     
  ]},
  { path: 'customers/new', children:[
     { path: '' , component: HeaderComponent, outlet: 'header'},
     { path: '', component: CustomerNewComponent},      
     { path: '' , component: MenuComponent, outlet: 'menu'},     
  ]},
  { path: 'customers/edit/:id', children:[
     { path: '' , component: HeaderComponent, outlet: 'header'},
     { path: '', component: CustomerEditComponent},      
     { path: '' , component: MenuComponent, outlet: 'menu'},     
  ]},  
  {path: '404', component: NotFoundComponent},
  {path: '**', redirectTo: '/404'}
];
export const routing = RouterModule.forRoot(appRoutes);