/**
 * Created by venky on 10/1/16.
 */
import { Report } from './report';

export const REPORTS: Report[]=[
    {id:1, username: 'vikram',msg:'Fuck', time:'10/01/2016 04:52:14 PM', channel:'gritandgreatness', upvotes:['pkanna1','bvenky27'], downvotes:[], resolved: false},
    {id:2, username:' pkanna1',msg:'Fuck and fuck', time:'16:54:14', channel:'gritandgreatness', upvotes:['nikhil497','bvenky27'], downvotes:['vikram'], resolved:true},
    {id:3, username:' bvenky27',msg:'Fuckdkghudgyvdjgyvdjgdjfgdjgyvdjkfgbyvsujygkujyu uy uy uryur yury uy uyuy u yu yu y uy uy uy ujgjgjh gjh g hg jh gjh gjhgjh ghj gjh gj g jhgjh g jghj gjh gjhg jh gj hgjhgjhgj hgjj  duck', time:'16:50:14', channel:'gritandgreatness', upvotes:['nikhil497','vikram'], downvotes:[],resolved: true},
    {id:4, username:' vikram',msg:'bullshit', time:'16:51:14', channel:'gritandgreatness', upvotes:['pkanna1','nikhil497'], downvotes:[],resolved: false},
    {id:5, username:' nikhil497',msg:'asshole', time:'16:57:14', channel:'gritandgreatness', upvotes:['pkanna1'], downvotes:[],resolved: false}
];