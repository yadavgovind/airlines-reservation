import {Observable,of, from } from 'rxjs';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SharedService {
    // Observable string sources
    private emitChangeSource = new Subject<any>();

    // Observable string streams
    changeEmitted$ = this.emitChangeSource.asObservable();
    // Service message commands
    emitChange(change: any) {
        this.emitChangeSource.next(change);
    }

    private userSessionUpdateCall = new Subject<any>();
    // Observable string streams
    userSessionUpdateCall$ = this.userSessionUpdateCall.asObservable();
    // Service message commands
    userSessionUpdateExecute(change: any) {
        this.userSessionUpdateCall.next(change);
    }
}
