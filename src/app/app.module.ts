import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ROUTES } from './app.routing';
import { AppComponent } from './app.component';
import { MdToolbarModule } from '@angular/material';
import { HttpModule } from '@angular/http';
import { CONFIG } from './shared/config';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    SharedModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [
    {
      provide: CONFIG,
      useValue: {
        apihost: 'https://i1.test-services.nykredit.it/cem-hackathon-service'
      }
    }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
