import { Injectable, Inject } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { CONFIG, EnvConfig } from '../shared/config';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class CustomerService {

    public list: Observable<Customer[]>;
    public listUpdates: Subject<any> = new Subject();
    public updateStream: Subject<Customer> = new Subject();
    public addStream: Subject<Customer> = new Subject();
    private defaultRequestOptions: RequestOptions;

    constructor(
        private http: Http,
        private router: Router,
        @Inject(CONFIG) private config: EnvConfig
    ) {

        this.defaultRequestOptions = new RequestOptions({
            headers: new Headers({
                    'Accept': 'application/hal+json',
                    'X-Client-Version': '1.0.0',
                    'Authorization': 'Bearer YmI0MGM3ZjYtNjMyYS00MjMxLWFmMDYtMDUzYTU1OTVkZmIz'
                })
            });

        this.list = this.getList()
            .map(list => _list => list)
            .merge(this.listUpdates)
            .scan((items, operation) => operation(items), [])
            .publishReplay(1)
            .refCount();

        this.updateStream
            .map(customer => items => {
                const toBeUpdated = items.find((item: Customer) => item.cprCvr === customer.cprCvr);
                if (toBeUpdated) {
                    Object.assign(toBeUpdated, customer);
                }
                return items;
            })
            .subscribe(this.listUpdates);

        this.addStream
            .map(customer => items => {
                items.push(customer);
                return items;
            })
            .subscribe(this.listUpdates);

    }

    update(customer: Customer) {
        return this.http.put(`${this.config.apihost}/customers/${customer.cprCvr}`, customer, this.defaultRequestOptions)
            .do(() => this.updateStream.next(customer))
            .map(res => res && res.json && res.json())
            .catch(err => this.unAuthHandler(err));
    }

    add(customer: Customer) {
        return this.http.put(`${this.config.apihost}/customers`, customer, this.defaultRequestOptions)
            .do(() => this.addStream.next(customer))
            .map(res => res && res.json && res.json())
            .catch(err => this.unAuthHandler(err));
    }

    get(cvr: string): Observable<Customer> {
        return this.http.get(`${this.config.apihost}/customers/${cvr}`, this.defaultRequestOptions)
            .map(res => res && res.json && res.json())
            .catch(err => this.unAuthHandler(err));
    }

    private getList(): Observable<Customer[]> {
        return this.http.get(`${this.config.apihost}/customers`, this.defaultRequestOptions)
            .map(res => res && res.json && res.json())
            .map(res => res._embedded.customers)
            .catch(err => this.unAuthHandler(err));
    }

    private unAuthHandler(err) {
        if (err.status === 401) { // NOTE this section should be moved to HTTP wrapping service and should be accessible globally
            this.router.navigate(['/login']);
        }
        return Observable.throw('');
    }

}

export interface Customer {
    cprCvr: string;
    firstName: string;
    lastName: string;
}
