/**
 * Created by venky on 10/2/16.
 */
import { Injectable } from '@angular/core';
import { TopDetails } from './top-details';
import { TOPDETAILS } from './mock-top';

@Injectable()

export class TopDetailService{
    //stub
    getTop(): Promise<TopDetails[]>{
        return Promise.resolve(TOPDETAILS);
    }
    getReportsSlowly(): Promise<TopDetails[]>{
        return new Promise<TopDetails[]>(resolve=>
            setTimeout(resolve,2000))
            .then(()=>this.getTop());
    }
}