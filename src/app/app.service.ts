import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../environments/environment';
import { tap, map } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private API_PATH:string = "http://localhost:3000/";
private task :any = {
 'task':'create repo',
 'status':'1'
 };
 private loginSubject:Subject<any> = new Subject<any>();
 private logoutSubject:Subject<boolean> = new Subject<boolean>();
  constructor(private http: HttpClient, private router: Router){

  }

  private setSession(httpResponse:any):void{
    if(httpResponse){
      localStorage.setItem('user',JSON.stringify(httpResponse));
      // localStorage.setItem('payload',JSON.stringify(httpResponse.body));
      this.loginSubject.next(httpResponse);

    }
  }

  getUser(){
    return JSON.parse(localStorage.getItem('user'));
  }

 

  loggedIn() : boolean{
    return !!(localStorage.getItem('user'));
  }

  login(credentials): Observable<any>{
    return this.http.post<any>(`${this.API_PATH}login`,credentials,{
      observe: "response"
    }).pipe(tap((httpResponse: HttpResponse<any>)=>{
      this.setSession(httpResponse.body[0]);
      console.log(httpResponse.body[0]);
    }),map((httpResponse:HttpResponse<any>)=>{
      return httpResponse.body;
    }));
  }



  loginHook() : Observable<any>{
    return this.loginSubject.asObservable();
  }

  logout():void{
    localStorage.removeItem('user');
    this.logoutSubject.next(true);
    this.router.navigate(['/login']);
  }

  logoutHook() : Observable<boolean>{
    return this.logoutSubject.asObservable();
  }
  getAllProducts(): Observable<any>{
    return this.http.get<any>(`${this.API_PATH}productList`,{
      observe: "response"
    }).pipe(map((httpResponse:HttpResponse<any>)=>{
      return httpResponse.body;
    }));
  }
  
 
}