import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http'
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RsvpComponent } from './components/rsvp.component';
import { AddrsvpComponent } from './components/addrsvp.component';
import { RsvpService } from './rsvp.service';

const ROUTES:Routes = [
  { path: '', component: RsvpComponent},
  { path: 'addrsvp', component: AddrsvpComponent},
	{ path: '**', redirectTo: '/', pathMatch: 'full' }
]

@NgModule({
  declarations: [
    AppComponent,
    RsvpComponent,
    AddrsvpComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [RsvpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
