import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { CustomerService } from '../customer.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent implements OnInit {

  private cvr: Observable<string>;
  public customerData: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private customer: CustomerService
  ) { }

  ngOnInit() {
    this.cvr = this.route.paramMap.map(params => params.get('cvr'))
      .filter(crv => Boolean(crv));

    this.customerData = this.cvr
      .mergeMap(cvr => this.customer.get(cvr))
      .publishReplay(1)
      .refCount();

  }

  onSubmit(form: NgForm) {
    const action = form.value.cprCvr
      ? this.customer.update(form.value)
      : this.customer.add(form.value);

    action
        .toPromise()
        .then(() => this.goToCustomerList());
  }

  goToCustomerList() {
    this.router.navigate(['/customer']);
  }

}
