import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {CustomerService} from '../customer.service';
import {Observable, of} from 'rxjs';

import * as customerActions from '../state/customer.actions';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {Customer} from '../customer.model';
import {Action} from '@ngrx/store';

@Injectable()
export class CustomerEffect {

  constructor(private actions$: Actions,
              private customerService: CustomerService) {

  }

  @Effect()
  loadedCustomers$: Observable<Action> = this.actions$.pipe(
    ofType<customerActions.LoadCustomers>
    (customerActions.CustomerActionTypes.LOAD_CUSTOMERS
    ),
    mergeMap((action: customerActions.LoadCustomers) =>
      this.customerService.getCustomers().pipe(
        map(
          (customers: Customer[]) =>
            new customerActions.LoadCustomersSuccess(customers)
        ),
        catchError(err => of(new customerActions.LoadCustomersFail(err)))
      )
    )
  );


  @Effect()
  loadedCustomer$: Observable<Action> = this.actions$.pipe(
    ofType<customerActions.LoadCustomer>
    (customerActions.CustomerActionTypes.LOAD_CUSTOMER
    ),
    mergeMap((action: customerActions.LoadCustomer) =>
      this.customerService.getCustomerById(action.payload).pipe(
        map(
          (customer: Customer) =>
            new customerActions.LoadCustomerSuccess(customer)
        ),
        catchError(err => of(new customerActions.LoadCustomerFail(err)))
      )
    )
  );

  @Effect()
  createCustomer$: Observable<Action> = this.actions$.pipe(
    ofType<customerActions.CreateCustomer>
    (customerActions.CustomerActionTypes.CREATE_CUSTOMER
    ),
    map((action: customerActions.CreateCustomer) => action.payload),
    mergeMap((customer: Customer) =>
      this.customerService.createCustomer(customer).pipe(
        map(
          (newCustomer: Customer) =>
            new customerActions.CreateCustomerSuccess(newCustomer)
        ),
        catchError(err => of(new customerActions.CreateCustomerFail(err)))
      )
    )
  );

  @Effect()
  updateCustomer$: Observable<Action> = this.actions$.pipe(
    ofType<customerActions.UpdateCustomer>
    (customerActions.CustomerActionTypes.UPDATE_CUSTOMER
    ),
    map((action: customerActions.UpdateCustomer) => action.payload),
    mergeMap((customer: Customer) =>
      this.customerService.updateCustomer(customer).pipe(
        map(
          (updatedCustomer: Customer) =>
            new customerActions.UpdateCustomerSuccess({
              id: updatedCustomer.id,
              changes: updatedCustomer
            })
        ),
        catchError(err => of(new customerActions.UpdateCustomerFail(err)))
      )
    )
  );

  @Effect()
  deleteCustomer$: Observable<Action> = this.actions$.pipe(
    ofType<customerActions.DeleteCustomer>
    (customerActions.CustomerActionTypes.DELETE_CUSTOMER
    ),
    map((action: customerActions.DeleteCustomer) => action.payload),
    mergeMap((id: number) =>
      this.customerService.deleteCustomer(id).pipe(
        map(
          (deletedCustomer: Customer) =>
            new customerActions.DeleteCustomerSuccess(id)
        ),
        catchError(err => of(new customerActions.DeleteCustomerFail(err)))
      )
    )
  );
}
