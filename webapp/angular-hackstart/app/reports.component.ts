/**
 * Created by venky on 10/1/16.
 */
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Report } from './report';
import { ReportService } from './report.service';
import { REPORTS } from './mock-report';
import { Router } from '@angular/router';


@Component({
    moduleId: module.id,
    selector: 'my-reports',
    templateUrl: 'reports.component.html',
    styleUrls: ['reports.component.css'],
    changeDetection: ChangeDetectionStrategy.Default,
   // providers:[PaginationService],
})

export class ReportsComponent implements OnInit{
    ngOnInit(): void {
        this.getReports();
    }
    reportTitle = "";
    reports = REPORTS;
    //selectedReport: Report;

    constructor(private reportService: ReportService,
                private router: Router,
                private reportSerice: ReportService){}
    getReports():void {
        this.reportService.getReportsSlowly().then(reports => this.reports = reports);
    }

    onSelect(report: Report ): void {

    }
    gotoDetail(report: Report):void{
        let link = ['/msgdetail',report.id];
        this.router.navigate(link)
    }





}
