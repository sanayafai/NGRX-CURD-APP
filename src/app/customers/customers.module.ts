import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CustomerComponent} from './customer/customer.component';
import {CustomerAddComponent} from './customer-add/customer-add.component';
import {CustomerEditComponent} from './customer-edit/customer-edit.component';
import {CustomerListComponent} from './customer-list/customer-list.component';
import {RouterModule, Routes} from '@angular/router';
import {StoreModule} from '@ngrx/store';
import {customerReducer} from './state/customer.reducer';
import {CustomerEffect} from './state/customer.effect';
import {EffectsModule} from '@ngrx/effects';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

const customerRoutes: Routes = [
  {path: '', component: CustomerComponent}

];

@NgModule({
  declarations: [CustomerComponent, CustomerAddComponent, CustomerEditComponent, CustomerListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    StoreModule.forFeature('customers', customerReducer),
    EffectsModule.forFeature([CustomerEffect]),
    RouterModule.forChild(customerRoutes)
  ]
})
export class CustomersModule {
}
