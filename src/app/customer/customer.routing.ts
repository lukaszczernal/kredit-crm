import { Routes } from '@angular/router';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerFormComponent } from './customer-form/customer-form.component';

export const ROUTES = [
    {
        path: '',
        component: CustomerListComponent
    },
    {
        path: 'new',
        component: CustomerFormComponent
    },
    {
        path: 'edit/:cvr',
        component: CustomerFormComponent
    }
] as Routes;
