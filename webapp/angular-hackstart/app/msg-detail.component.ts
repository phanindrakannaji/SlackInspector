/**
 * Created by venky on 10/2/16.
 */
import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {Location} from '@angular/common';
import {ReportService} from './report.service';
import { Report } from './report';

@Component({
    moduleId: module.id,
    selector: 'msg-detail',
    templateUrl:'msg-detail.component.html',
    styleUrls:['msg-detail.component.css']
})

export class MsgDetailComponent implements OnInit{
    ngOnInit(): void {
        this.route.params.forEach((params:Params) =>{
            let id = +params['id'];
            this.reportService.getReport(id)
                .then(report => this.report = report);
        })
    }

    report:Report;

    constructor( private reportService:ReportService,
    private route: ActivatedRoute,
    private location:Location){}

    goBack():void{
        this.location.back();
    }
}