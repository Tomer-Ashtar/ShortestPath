import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GridComponent } from './grid/grid.component';
import { DijakstraComponent } from './dijakstra/dijakstra.component';

@NgModule({
  declarations: [
    AppComponent,
    GridComponent,
    DijakstraComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
