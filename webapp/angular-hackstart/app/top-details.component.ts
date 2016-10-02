/**
 * Created by venky on 10/2/16.
 */
import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {Location} from '@angular/common';
import {ReportService} from './report.service';
import { Report } from './report';
import {TOPDETAILS} from "./mock-top";
import {TopDetailService} from "./top-details.service";

@Component({
    moduleId: module.id,
    selector: 'my-reports',
    templateUrl: 'reports.component.html',
    styleUrls: ['reports.component.css'],

})

export class TopDetailsComponent implements OnInit{
    ngOnInit(): void {
        this.getTop();
    }
    topdetails = TOPDETAILS;
    //selectedReport: Report;

    constructor(private topService: TopDetailService
    ){}
    getTop():void {
        this.topService.getReportsSlowly().then(topdetails => this.topdetails = topdetails);
    }
}