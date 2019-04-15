import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Customer} from './customer.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private customersUrl = 'http://localhost:3000/customers';

  constructor(private http: HttpClient) {}

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.customersUrl);
  }

  getCustomerById(payload: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.customersUrl}/${payload}`);
  }

  createCustomer(payload: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.customersUrl, payload);
  }

  updateCustomer(customer: Customer): Observable<Customer> {
    return this.http.patch<Customer>(
      `${this.customersUrl}/${customer.id}`,
      customer
    );
  }

  deleteCustomer(payload: number) {
    return this.http.delete(`${this.customersUrl}/${payload}`);
  }
}
