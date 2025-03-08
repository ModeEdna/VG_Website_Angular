import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ModalComponent } from './components/building_blocks/modal/modal.component';
import { PoliciesAndProceduresComponent } from './components/pages/policies-and-procedures/policies-and-procedures.component';

@NgModule({
  imports: [
    BrowserModule,
    AppComponent,
    HeaderComponent,
    ModalComponent,
    PoliciesAndProceduresComponent,
  ],
  providers: [],
})
export class AppModule {}
