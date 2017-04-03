import { Component } from '@angular/core';
import { FillPipe } from './fill.pipe';
import { FilterArrayPipe } from './filter.pipe';
@Component({
  selector: 'btc-table',    
  moduleId:module.id,
  template:`
  <div>
    <input type="text" [(ngModel)]="searchString" (keyup)="filterResult($event)" placeHolder="Search" class="form-control" /> <br/>
  </div>
  <table class="table table-bordered">
    <thead>
        <tr><th *ngFor="let t of theader">{{t.colDisplay}}</th></tr>
    </thead>
    <tbody>
        <tr *ngFor="let d of displayData">
            <td *ngFor="let t of theader">{{d[t.colName]}}</td>         
        </tr>
    </tbody>
    <tfoot>
        <tr><th *ngFor="let t of theader">{{t.colDisplay}}</th></tr>
    </tfoot>
  </table>
  <div>    
        <div style="display:inline-block">{{displayStatus}}</div>
        <div
        (click)="showPage(ndx + 1)" 
        style="display:inline-block; margin:5px;" 
        class="btn btn-success" 
        *ngFor="let item of totalPages | fill let ndx = index">{{ndx + 1}}</div>
  </div>
  `,
   pipes: [ FillPipe,FilterArrayPipe ]
})
export class BtcTableComponent {
    theader = [{
        colName:"id",
        colDisplay:"ID"
    },{
        colName:"FullName",
        colDisplay:"Full Name"
    },{
        colName:"Email",
        colDisplay:"Email"
    }];   
    totalResultCount:number = 10;
    totalResultPerPage:number = 3;
    totalRemaining:number;
    totalPages:number;
    searchString:string;
    displayStatus:string;
    displayData:Datum[];
    inMemoryData:Datum[];
    data:Datum[] = [
        {id:1,FullName:"Julius Bacosa",Email:"juliusbacosa@gmail.com",p:1},
        {id:2,FullName:"Julius Ceasar",Email:"juliusceasar@gmail.com",p:1},
        {id:3,FullName:"Napoleon Bonaparte",Email:"napoleonbonaparte@gmail.com",p:1},
        {id:4,FullName:"Genghis Khan",Email:"genghiskhan@gmail.com",p:2},
        {id:5,FullName:"Joseph Stalin",Email:"josephstalin@gmail.com",p:2},        
        {id:6,FullName:"Cara Delevingne",Email:"caradelevingne@gmail.com",p:2},
        {id:7,FullName:"Wintson Churchill",Email:"winstonchurchill@gmail.com",p:3},
        {id:8,FullName:"Vladimir Putin",Email:"vladimirputin@gmail.com",p:3},
        {id:9,FullName:"Adolf Hitler",Email:"adolfhitler@gmail.com",p:3},
        {id:9,FullName:"Donald Trump",Email:"donaltrump@gmail.com",p:4},
    ];

    constructor(){}

    ngOnInit(){        
        this.inMemoryData =this.data;
        this.showPage(1);
        
    }

    showPage(index){       
        var  d = this.inMemoryData;       
      
        var newd = [];
        for(var i in d){    
            if(d[i].p==parseInt(index)){
              newd.push(d[i]);      
            }
        }        
        this.totalPages = Math.ceil(this.inMemoryData.length / this.totalResultPerPage);
        this.totalRemaining = this.inMemoryData.length % this.totalResultPerPage;
        this.displayData = newd;
        this.displayStatus = "Showing " + newd.length + " of " + d.length;

    }
    filterResult(event:any) {
       
        var str = this.searchString;
        var d = this.data;
        var newd = [];
       
       
        var itemCounter = 1;
        var pageCounter = 1;                
        for(let i in d){
          if((typeof d[i].FullName === 'string' || d[i] instanceof Datum) && (d[i].FullName.indexOf(str)!==-1)){
               
               d[i].p = pageCounter;
               newd.push(d[i]);

               // assign page
               if(itemCounter >= this.totalResultPerPage){
                   itemCounter=1;
                   pageCounter++;

               }else{
                   itemCounter++;
               }
               
          }
        }

        this.inMemoryData = newd;
        this.totalPages = Math.ceil(newd.length / this.totalResultPerPage);
        this.totalRemaining = newd.length % this.totalResultPerPage;
        this.showPage(1);
    }
    
    
}

export class Datum{
    id:number;
    FullName:string;
    Email:string;
    p:number;
}

export class TableHeader{
    colName:string;
    colDisplay:string;
}

