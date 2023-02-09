import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DialogService } from './custom-modal/dialog.service';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, ModalComponent],
  providers: [DialogService],
  bootstrap: [AppComponent],
})
export class AppModule {}
