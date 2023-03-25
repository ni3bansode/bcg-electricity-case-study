import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrimeNgModule } from './shared/prime-ng/prime-ng.module';
import { RequestsComponent } from './components/requests/requests.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component'
import { HttpClientModule } from '@angular/common/http';
import { ReportComponent } from './components/report/report.component';
import { ChartModule } from 'angular-highcharts';
import { ConfirmationService, MessageService } from 'primeng/api';
@NgModule({
  declarations: [
    AppComponent,
    RequestsComponent,
    HomeComponent,
    LoginComponent,
    HeaderComponent,
    ReportComponent,
    // HighchartsChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PrimeNgModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ChartModule,
    FormsModule
  ],
  providers: [ConfirmationService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
