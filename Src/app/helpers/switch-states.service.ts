import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EventEmitter } from 'stream';

@Injectable({
  providedIn: 'root'
})
export class SwitchStatesService {

  private newModeObservable:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  changeMode(mode:boolean):void{
    this.newModeObservable.next(mode)
  }

  getNewModeObservable():BehaviorSubject<boolean>{
    return this.newModeObservable
  }

  constructor() { }
}
