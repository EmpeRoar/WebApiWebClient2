import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
   moduleId: module.id,
   templateUrl: 'dashboard.component.html'
})
export class DashboardComponent {
  title = 'Dashboard';
  constructor(private router: Router){}
  ngOnInit(){
        
        // check if authenticated redirects
        //this.router.navigate(['login']);

        

        
  }
}

