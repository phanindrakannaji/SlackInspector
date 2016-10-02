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
 * Created by venky on 10/1/16.
 */
var core_1 = require('@angular/core');
var report_service_1 = require('./report.service');
var mock_report_1 = require('./mock-report');
var router_1 = require('@angular/router');
var ReportsComponent = (function () {
    //selectedReport: Report;
    function ReportsComponent(reportService, router, reportSerice) {
        this.reportService = reportService;
        this.router = router;
        this.reportSerice = reportSerice;
        this.reportTitle = "";
        this.reports = mock_report_1.REPORTS;
    }
    ReportsComponent.prototype.ngOnInit = function () {
        this.getReports();
    };
    ReportsComponent.prototype.getReports = function () {
        var _this = this;
        this.reportService.getReportsSlowly().then(function (reports) { return _this.reports = reports; });
    };
    ReportsComponent.prototype.onSelect = function (report) {
    };
    ReportsComponent.prototype.gotoDetail = function (report) {
        var link = ['/msgdetail', report.id];
        this.router.navigate(link);
    };
    ReportsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-reports',
            templateUrl: 'reports.component.html',
            styleUrls: ['reports.component.css'],
            changeDetection: core_1.ChangeDetectionStrategy.Default,
        }), 
        __metadata('design:paramtypes', [report_service_1.ReportService, router_1.Router, report_service_1.ReportService])
    ], ReportsComponent);
    return ReportsComponent;
}());
exports.ReportsComponent = ReportsComponent;
//# sourceMappingURL=reports.component.js.map