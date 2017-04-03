import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
   moduleId: module.id,
   templateUrl: 'notfound.component.html'
})
export class NotFoundComponent {
  title = 'Not Found';
  constructor(private router: Router){}
  ngOnInit(){        
  }
}

