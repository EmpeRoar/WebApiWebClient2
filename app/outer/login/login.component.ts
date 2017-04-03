import { Component,Pipe, PipeTransform,  } from '@angular/core';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';

@Component({
   moduleId: module.id,
   templateUrl: 'login.component.html',
   pipes:[]
})
export class LoginComponent {
  title = 'Login';
  remember:boolean;
  username:string;
  password:string;  

  isConsented:Boolean;
  COOKIE_CONSENT:string; // should be set as app setting
  COOKIE_CONSENT_EXPIRE_DAYS:number; // should be set as app setting

  constructor(private router:Router){
    
  } 
  onSubmit(){           
     // if remember  write persistent cookie

     console.log(this.remember + this.username + this.password);

     this.router.navigate(['/admin']);
     
  }

  getCookie(name: string) {
        let ca: Array<string> = document.cookie.split(';');
        let caLen: number = ca.length;
        let cookieName = name + "=";
        let c: string;

        for (let i: number = 0; i < caLen; i += 1) {
            c = ca[i].replace(/^\s\+/g, "");
            if (c.indexOf(cookieName) == 0) {
                return c.substring(cookieName.length, c.length);
            }
        }
        return "";
    }

    deleteCookie(name) {
        this.setCookie(name, "", -1);
    }

    setCookie(name: string, value: string, expireDays: number, path: string = "") {
        let d:Date = new Date();
        d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1000);
        let expires:string = "expires=" + d.toUTCString();
        document.cookie = name + "=" + value + "; " + expires + (path.length > 0 ? "; path=" + path : "");
    }

    consent(isConsent: boolean, e: any) {
        if (!isConsent) {
            return this.isConsented;
        } else if (isConsent) {
            this.setCookie(this.COOKIE_CONSENT, "1", this.COOKIE_CONSENT_EXPIRE_DAYS);
            this.isConsented = true;
            e.preventDefault();
        }
    }
}

