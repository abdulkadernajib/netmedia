import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class VoucherService {

  private debtorUrl = '/api/debtor'



  constructor(private http: HttpClient) { }

  public getCities(): Observable<any> {
    return this.http.get('/api/city')
  }
  public getStates(): Observable<any> {
    return this.http.get('/api/state')
  }

  public addDebtor(debtor: Customer) {
    return this.http.post(this.debtorUrl, debtor);
  }
}
