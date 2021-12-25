import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HangmanComponent } from './components/hangman/hangman.component';
import { PlayAgainComponent } from './components/play-again/play-again.component';

@NgModule({
  declarations: [
    AppComponent,
    HangmanComponent,
    PlayAgainComponent
  ],
  imports: [
    BrowserModule,
		HttpClientModule,
		FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
