import {createFeatureSelector, createSelector} from '@ngrx/store';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';

import {Customer} from '../customer.model';
import * as fromRoot from '../../state/app-state';
import * as customerActions from './customer.actions';
import {CustomerActionTypes} from './customer.actions';


export interface CustomerState extends EntityState<Customer> {
  selectedCustomerId: number | null;
  loading: boolean;
  loaded: boolean;
  error: string;
}

export interface AppState extends fromRoot.AppState {
  customers: CustomerState;

}

export const customerAdapter: EntityAdapter<Customer> = createEntityAdapter<Customer>();

export const defaultCustomer: CustomerState = {
  ids: [],
  entities: {},
  selectedCustomerId: null,
  loading: false,
  loaded: false,
  error: ''

};

const initialState = customerAdapter.getInitialState(defaultCustomer);

export function customerReducer(state = initialState, action: customerActions.Action) {

  switch (action.type) {


    case CustomerActionTypes.LOAD_CUSTOMERS_SUCCESS: {
      return customerAdapter.addAll(action.payload, {
        ...state, loading: false, loaded: true
      });
    }
    case CustomerActionTypes.LOAD_CUSTOMERS_FAIL: {
      return {...state, entities: {}, loading: false, loaded: false, error: action.payload};
    }


    case CustomerActionTypes.LOAD_CUSTOMER_SUCCESS: {
      return customerAdapter.addOne(action.payload, {
        ...state, selectedCustomerId: action.payload.id
      });
    }
    case CustomerActionTypes.LOAD_CUSTOMER_FAIL: {
      return {...state, error: action.payload};
    }

    case CustomerActionTypes.CREATE_CUSTOMER_SUCCESS: {
      return customerAdapter.addOne(action.payload, state);
    }
    case CustomerActionTypes.CREATE_CUSTOMER_FAIL: {
      return {...state, error: action.payload};
    }

    case CustomerActionTypes.UPDATE_CUSTOMER_SUCCESS: {
      return customerAdapter.updateOne(action.payload, state);
    }
    case CustomerActionTypes.UPDATE_CUSTOMER_FAIL: {
      return {...state, error: action.payload};
    }

    case CustomerActionTypes.DELETE_CUSTOMER_SUCCESS: {
      return customerAdapter.removeOne(action.payload, state);
    }
    case CustomerActionTypes.DELETE_CUSTOMER_FAIL: {
      return {...state, error: action.payload};
    }

    default: {

      return state;
    }

  }

}

const getCustomerFeatureState = createFeatureSelector<CustomerState>(
  'customers'
);

export const getCustomers = createSelector(
  getCustomerFeatureState,
  customerAdapter.getSelectors().selectAll
);

export const getCustomersLoading = createSelector(
  getCustomerFeatureState, (state: CustomerState) => state.loading
);
export const getCustomersLoaded = createSelector(
  getCustomerFeatureState, (state: CustomerState) => state.loaded
);
export const getError = createSelector(
  getCustomerFeatureState, (state: CustomerState) => state.error
);

export const getCurrentCustomerId = createSelector(
  getCustomerFeatureState,
  (state: CustomerState) => state.selectedCustomerId
);

export const getCurrentCustomer = createSelector(
  getCustomerFeatureState,
  getCurrentCustomerId,
  state => state.entities[state.selectedCustomerId]
);
