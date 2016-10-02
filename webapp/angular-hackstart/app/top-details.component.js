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
/**
 * Created by venky on 10/2/16.
 */
var core_1 = require('@angular/core');
var mock_top_1 = require("./mock-top");
var top_details_service_1 = require("./top-details.service");
var TopDetailsComponent = (function () {
    //selectedReport: Report;
    function TopDetailsComponent(topService) {
        this.topService = topService;
        this.topdetails = mock_top_1.TOPDETAILS;
    }
    TopDetailsComponent.prototype.ngOnInit = function () {
        this.getTop();
    };
    TopDetailsComponent.prototype.getTop = function () {
        var _this = this;
        this.topService.getReportsSlowly().then(function (topdetails) { return _this.topdetails = topdetails; });
    };
    TopDetailsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-reports',
            templateUrl: 'reports.component.html',
            styleUrls: ['reports.component.css'],
        }), 
        __metadata('design:paramtypes', [top_details_service_1.TopDetailService])
    ], TopDetailsComponent);
    return TopDetailsComponent;
}());
exports.TopDetailsComponent = TopDetailsComponent;
//# sourceMappingURL=top-details.component.js.map