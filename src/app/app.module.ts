import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
    // Remove AppComponent from here since it's standalone
  ],
  imports: [
    BrowserModule,
    AppComponent, // Import the standalone component instead
    HeaderComponent, // Import the standalone component instead
  ],
  providers: [],
  bootstrap: [],
})
export class AppModule {}
