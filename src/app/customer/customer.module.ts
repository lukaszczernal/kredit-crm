import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ROUTES } from './customer.routing';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { CustomerService } from './customer.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    RouterModule.forChild(ROUTES),
    SharedModule
  ],
  declarations: [
    CustomerListComponent,
    CustomerFormComponent
  ],
  providers: [
    CustomerService
  ],
  exports: [
    RouterModule
  ]
})
export class CustomerModule { }
