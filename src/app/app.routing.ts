import { Routes } from '@angular/router';
import { CustomerModule } from './customer/customer.module';
import { AppComponent } from './app.component';
import { LoginModule } from './login/login.module';

export const ROUTES = [
    {
        path: '',
        redirectTo: 'customer',
        pathMatch: 'full'
    },
    {
        path: 'customer',
        loadChildren: getCustomerModule
    },
    {
        path: 'login',
        loadChildren: getLoginModule
    }
] as Routes;


export function getCustomerModule() {
    return CustomerModule;
}

export function getLoginModule() {
    return LoginModule;
}
