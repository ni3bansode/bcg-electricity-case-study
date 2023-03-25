import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,

  ],
  exports: [
    TableModule,
    PanelModule,
    InputTextModule,
    ButtonModule,
    SidebarModule,
    ToolbarModule,
    DialogModule,
    DropdownModule,
    InputNumberModule,
    CalendarModule,
    ConfirmDialogModule,
    ToastModule
  ]
})
export class PrimeNgModule { }
