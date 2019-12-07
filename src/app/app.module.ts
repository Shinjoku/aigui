import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatVideoModule } from 'mat-video';
import { ReactiveFormsModule } from '@angular/forms';

import {
 MatToolbarModule,
 MatButtonModule,
 MatIconModule,
 MatCardModule,
 MatTabsModule,
 MatGridListModule,
 MatSnackBarModule,
} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { InsertFormComponent } from './insert-form/insert-form.component';
@NgModule({
 declarations: [
   AppComponent,
   LoginComponent,
   HomeComponent,
   InsertFormComponent
 ],
 imports: [
   BrowserModule,
   BrowserAnimationsModule,
   AppRoutingModule,
   HttpClientModule,
   MatToolbarModule,
   MatButtonModule,
   MatIconModule,
   MatCardModule,
   MatTabsModule,
   MatSnackBarModule,
   MatGridListModule,
   BrowserAnimationsModule,
   MatVideoModule,
   ReactiveFormsModule
 ],
 providers: [],
 bootstrap: [AppComponent]
})
export class AppModule { }