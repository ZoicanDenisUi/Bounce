import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { SwitchStatesService } from 'src/app/helpers/switch-states.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent{

  constructor(public location:Location, private switchStatesService:SwitchStatesService ) { }

  
  isNormal:boolean = false

  showTop(){
    window.alert("To be implemented 🤓");
  }

  public toggle(event: MatSlideToggleChange) {
    this.isNormal = event.checked
    this.switchStatesService.changeMode(!event.checked)
  }

}
