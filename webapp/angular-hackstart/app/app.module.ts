import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
//import { Ng2PaginationModule } from 'ng2-pagination';

import { AppComponent }   from './app.component';
import { ReportService } from './report.service';
import { ReportsComponent} from './reports.component'
import { routing } from './app.routing';
import {MsgDetailComponent} from './msg-detail.component';
//import {TopDetailService} from './top-details.service';
//import {TopDetailsComponent} from './top-details.component';

@NgModule({
    imports:      [ BrowserModule,
    FormsModule,
    routing,
        //Ng2PaginationModule
    ],
    declarations: [ AppComponent,
    ReportsComponent,
    MsgDetailComponent,
        //TopDetailsComponent
    ],
    providers : [
        ReportService,
        //TopDetailService
    ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }
