/**
 * Created by venky on 10/1/16.
 */
import { Component } from '@angular/core';
@Component({
    moduleId:module.id,
    selector: 'my-app',
    template: `
        <h1 style="display:none;"><a routerLink="/dashboard" routerLinkActive="active">Dashboard</a></h1>
        <div class="Top10ButtonDiv">
            <br/><br/><button  class= "top10button" (click)="goTop()">Top 10</button><br/><br/>
        </div>
        <router-outlet></router-outlet>
    `,
    styleUrls:['./app.component.css']
})
export class AppComponent {
}
