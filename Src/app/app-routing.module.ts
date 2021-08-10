import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { ChipsComponent } from './components/chips/chips.component';
import { GameComponent } from './components/game/game.component';

const routes: Routes = [
  { path: '', component: GameComponent },
  { path: 'about', component: AboutComponent},
  { path: 'select', component:ChipsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }