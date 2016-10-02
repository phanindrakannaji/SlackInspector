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
var router_1 = require('@angular/router');
var common_1 = require('@angular/common');
var report_service_1 = require('./report.service');
var MsgDetailComponent = (function () {
    function MsgDetailComponent(reportService, route, location) {
        this.reportService = reportService;
        this.route = route;
        this.location = location;
    }
    MsgDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.forEach(function (params) {
            var id = +params['id'];
            _this.reportService.getReport(id)
                .then(function (report) { return _this.report = report; });
        });
    };
    MsgDetailComponent.prototype.goBack = function () {
        this.location.back();
    };
    MsgDetailComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'msg-detail',
            templateUrl: 'msg-detail.component.html',
            styleUrls: ['msg-detail.component.css']
        }), 
        __metadata('design:paramtypes', [report_service_1.ReportService, router_1.ActivatedRoute, common_1.Location])
    ], MsgDetailComponent);
    return MsgDetailComponent;
}());
exports.MsgDetailComponent = MsgDetailComponent;
//# sourceMappingURL=msg-detail.component.js.map