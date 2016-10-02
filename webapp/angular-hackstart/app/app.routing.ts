/**
 * Created by venky on 10/1/16.
 */
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {ReportsComponent} from "./reports.component";
import {MsgDetailComponent} from './msg-detail.component'
//import {TopDetailsComponent} from "./top-details.component";

const appRoutes: Routes = [
    {
        path: '',
        redirectTo:'/dashboard',
        pathMatch: 'full'

    },
    {
      path: 'msgdetail/:id',
        component:MsgDetailComponent
    },

    {
        path : 'dashboard',
        component: ReportsComponent
    },
  /*  {
        path : 'topdetail',
        component: TopDetailsComponent
    }*/
]

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);