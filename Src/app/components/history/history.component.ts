import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { Round } from '../../helpingClasses/round';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  constructor() { }

  @Input() roundObserver!:Subject<Round>;
  
  historyRounds:Round[] = []

  ngOnInit(): void {
    this.roundObserver.subscribe((newRound)=>{
      this.historyRounds.push(newRound)
      if(this.historyRounds.length>10){
        this.historyRounds.shift()
      }
    })
  }


}
