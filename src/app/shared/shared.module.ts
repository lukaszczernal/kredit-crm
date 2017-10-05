import {
  MdIconModule,
  MdCardModule,
  MdInputModule,
  MdTableModule,
  MdButtonModule,
  MdToolbarModule,
  MdFormFieldModule,
} from '@angular/material';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    HttpModule,
    FormsModule,
    CommonModule,
    MdIconModule,
    MdCardModule,
    MdInputModule,
    MdTableModule,
    MdButtonModule,
    MdToolbarModule,
    MdFormFieldModule
  ],
  exports: [
    HttpModule,
    FormsModule,
    CommonModule,
    MdIconModule,
    MdCardModule,
    MdInputModule,
    MdTableModule,
    MdButtonModule,
    MdToolbarModule,
    MdFormFieldModule
  ]
})
export class SharedModule { }
