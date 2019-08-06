import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  subject:Subject<boolean> = new Subject<boolean>();

  constructor() { }
  
  show():void {
    this.subject.next(true);
  }
  
  hide():void {
    this.subject.next(false);
  }

  getState(): Observable<boolean>{
    return this.subject.asObservable();
  }

}