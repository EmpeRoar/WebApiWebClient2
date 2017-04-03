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
var fill_pipe_1 = require('./fill.pipe');
var filter_pipe_1 = require('./filter.pipe');
var BtcTableComponent = (function () {
    function BtcTableComponent() {
        this.theader = [{
                colName: "id",
                colDisplay: "ID"
            }, {
                colName: "FullName",
                colDisplay: "Full Name"
            }, {
                colName: "Email",
                colDisplay: "Email"
            }];
        this.totalResultCount = 10;
        this.totalResultPerPage = 3;
        this.data = [
            { id: 1, FullName: "Julius Bacosa", Email: "juliusbacosa@gmail.com", p: 1 },
            { id: 2, FullName: "Julius Ceasar", Email: "juliusceasar@gmail.com", p: 1 },
            { id: 3, FullName: "Napoleon Bonaparte", Email: "napoleonbonaparte@gmail.com", p: 1 },
            { id: 4, FullName: "Genghis Khan", Email: "genghiskhan@gmail.com", p: 2 },
            { id: 5, FullName: "Joseph Stalin", Email: "josephstalin@gmail.com", p: 2 },
            { id: 6, FullName: "Cara Delevingne", Email: "caradelevingne@gmail.com", p: 2 },
            { id: 7, FullName: "Wintson Churchill", Email: "winstonchurchill@gmail.com", p: 3 },
            { id: 8, FullName: "Vladimir Putin", Email: "vladimirputin@gmail.com", p: 3 },
            { id: 9, FullName: "Adolf Hitler", Email: "adolfhitler@gmail.com", p: 3 },
            { id: 9, FullName: "Donald Trump", Email: "donaltrump@gmail.com", p: 4 },
        ];
    }
    BtcTableComponent.prototype.ngOnInit = function () {
        this.inMemoryData = this.data;
        this.showPage(1);
    };
    BtcTableComponent.prototype.showPage = function (index) {
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
    BtcTableComponent.prototype.filterResult = function (event) {
        var str = this.searchString;
        var d = this.data;
        var newd = [];
        var itemCounter = 1;
        var pageCounter = 1;
        for (var i in d) {
            if ((typeof d[i].FullName === 'string' || d[i] instanceof Datum) && (d[i].FullName.indexOf(str) !== -1)) {
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
    BtcTableComponent = __decorate([
        core_1.Component({
            selector: 'btc-table',
            moduleId: module.id,
            template: "\n  <div>\n    <input type=\"text\" [(ngModel)]=\"searchString\" (keyup)=\"filterResult($event)\" placeHolder=\"Search\" class=\"form-control\" /> <br/>\n  </div>\n  <table class=\"table table-bordered\">\n    <thead>\n        <tr><th *ngFor=\"let t of theader\">{{t.colDisplay}}</th></tr>\n    </thead>\n    <tbody>\n        <tr *ngFor=\"let d of displayData\">\n            <td *ngFor=\"let t of theader\">{{d[t.colName]}}</td>         \n        </tr>\n    </tbody>\n    <tfoot>\n        <tr><th *ngFor=\"let t of theader\">{{t.colDisplay}}</th></tr>\n    </tfoot>\n  </table>\n  <div>    \n        <div style=\"display:inline-block\">{{displayStatus}}</div>\n        <div\n        (click)=\"showPage(ndx + 1)\" \n        style=\"display:inline-block; margin:5px;\" \n        class=\"btn btn-success\" \n        *ngFor=\"let item of totalPages | fill let ndx = index\">{{ndx + 1}}</div>\n  </div>\n  ",
            pipes: [fill_pipe_1.FillPipe, filter_pipe_1.FilterArrayPipe]
        }), 
        __metadata('design:paramtypes', [])
    ], BtcTableComponent);
    return BtcTableComponent;
}());
exports.BtcTableComponent = BtcTableComponent;
var Datum = (function () {
    function Datum() {
    }
    return Datum;
}());
exports.Datum = Datum;
var TableHeader = (function () {
    function TableHeader() {
    }
    return TableHeader;
}());
exports.TableHeader = TableHeader;
//# sourceMappingURL=btc-table.component.js.map