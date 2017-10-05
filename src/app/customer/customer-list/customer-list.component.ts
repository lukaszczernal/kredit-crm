import { Component, OnInit } from '@angular/core';
import { CustomerService, Customer } from '../customer.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {

  public customerList: any;
  public customerListColumns: any;

  constructor(
    private customer: CustomerService
  ) { }

  ngOnInit() {

    this.customerList = {
      connect: () => this.customer.list,
      disconnect: () => {}
    };

    this.customerListColumns = ['cprCvr', 'firstName', 'lastName', 'actions'];
  }

}
