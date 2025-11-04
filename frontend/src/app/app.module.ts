import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';         // ✅ must be here
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,         // ✅ must be here
    HttpClientModule     // ✅ for HTTP requests
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
