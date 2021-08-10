import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { AppComponent } from './app.component';
import { DomInteractionsService } from './helpers/dom-interactions.service';
import { BounceAnimationComponent } from './components/bounce-animation/bounce-animation.component';
import { FormsModule } from '@angular/forms';
import { HistoryComponent } from './components/history/history.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AppRoutingModule } from './app-routing.module';
import {APP_BASE_HREF} from '@angular/common';
import { GameComponent } from './components/game/game.component';
import { AboutComponent } from './components/about/about.component';
import { ExpandOnHoverDirective } from './directives/expand-on-hover.directive';
import { MakePositivePipe } from './pipes/make-positive.pipe';
import { HttpClientModule } from '@angular/common/http';
import {MatSelectModule} from '@angular/material/select'
import {ReactiveFormsModule} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from "@angular/material/input";
import { ChipsComponent } from './components/chips/chips.component';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    BounceAnimationComponent,
    HistoryComponent,
    NavbarComponent,
    GameComponent,
    AboutComponent,
    ExpandOnHoverDirective,
    MakePositivePipe,
    ChipsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatIconModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
    MatChipsModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatToolbarModule,
    AppRoutingModule,
    HttpClientModule,
    MatSelectModule,
    MatSlideToggleModule
  ],
  providers: [DomInteractionsService,{provide: APP_BASE_HREF, useValue : '/' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
