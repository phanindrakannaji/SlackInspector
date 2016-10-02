/**
 * Created by venky on 10/1/16.
 */
import { Injectable } from '@angular/core';
import { Report } from './report';
import { REPORTS } from './mock-report';

@Injectable()

export class ReportService{
    //stub
    getReports(): Promise<Report[]>{
        return Promise.resolve(REPORTS);
    }
    getReportsSlowly(): Promise<Report[]>{
        return new Promise<Report[]>(resolve=>
        setTimeout(resolve,2000))
            .then(()=>this.getReports());
    }
    getReport(id:number):Promise<Report>{
        return this.getReports()
            .then(reports => reports.find(report => report.id ===id));
    }
}