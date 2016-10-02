"use strict";
var router_1 = require('@angular/router');
var reports_component_1 = require("./reports.component");
var msg_detail_component_1 = require('./msg-detail.component');
//import {TopDetailsComponent} from "./top-details.component";
var appRoutes = [
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    },
    {
        path: 'msgdetail/:id',
        component: msg_detail_component_1.MsgDetailComponent
    },
    {
        path: 'dashboard',
        component: reports_component_1.ReportsComponent
    },
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map