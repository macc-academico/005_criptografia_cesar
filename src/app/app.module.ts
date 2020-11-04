import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MetodoCesarComponent } from './metodo-cesar/metodo-cesar.component';
import { MetodoCesarDespComponent } from './metodo-cesar-desp/metodo-cesar-desp.component';
import { MetodoCesarClaveComponent } from './metodo-cesar-clave/metodo-cesar-clave.component';

@NgModule({
  declarations: [AppComponent, MetodoCesarComponent, MetodoCesarDespComponent, MetodoCesarClaveComponent],
  imports: [BrowserModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
