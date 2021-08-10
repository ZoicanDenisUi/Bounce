import { Component, ElementRef, ViewChild } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-chips',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.css']
})
export class ChipsComponent {

  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  categories: string[] = [];

  @Output() categoryEventEmitter = new EventEmitter<string[]>();
  @ViewChild('categoryInput') categoryInput!: ElementRef<HTMLInputElement>;

  constructor() {
    
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if(this.categories.length > 2){
      alert("Too many tags!")
    } else if(value === '') {
      alert("Please insert a valid tag")
    } else {
      this.categories.push(value);
    } 

    // Clear the input value
    event.chipInput!.clear();
    this.categoryEventEmitter.emit(this.categories)

  }

  remove(fruit: string): void {
    const index = this.categories.indexOf(fruit);

    if (index >= 0) {
      this.categories.splice(index, 1);
    }

    this.categoryEventEmitter.emit(this.categories)
    
  }

}


