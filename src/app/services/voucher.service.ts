import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../models/customer.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VoucherService {
  apiUrl = environment.apiUrl;

  private debtorUrl = this.apiUrl + '/api/debtor'
  private creditorUrl = this.apiUrl + '/api/creditor'
  private purchaseUrl = this.apiUrl + '/api/purchase'
  private salesUrl = this.apiUrl + '/api/sales'


  constructor(private http: HttpClient) { }

  public getCities(state): Observable<any> {
    return this.http.get(this.apiUrl + '/api/city/' + state)
  }
  public getStates(): Observable<any> {
    return this.http.get(this.apiUrl + '/api/state')
  }


  public addDebtor(debtor: any) {
    return this.http.post(this.debtorUrl, debtor);
  }

  public addCreditor(creditor: any) {
    return this.http.post(this.creditorUrl, creditor);
  }

  public addPurchase(purchaseIncvoice: any) {
    return this.http.post(this.purchaseUrl, purchaseIncvoice);
  }
  public addSales(SalesIncvoice: any) {
    return this.http.post(this.salesUrl, SalesIncvoice);
  }

  public getDebtor(): Observable<any> {
    return this.http.get(`${this.debtorUrl}/all`);

  }
  public getCreditor(): Observable<any> {
    return this.http.get(`${this.creditorUrl}/all`);
  }
  public getPurchases(): Observable<any> {
    return this.http.get(this.purchaseUrl);
  }
  public getSales(): Observable<any> {
    return this.http.get(this.salesUrl);
  }
  public getDebtorByID(_id: any): Observable<any> {
    return this.http.get(this.debtorUrl + '/' + _id);
  }
  public getCreditorByID(_id: any): Observable<any> {
    return this.http.get(this.creditorUrl + '/' + _id);
  }

  public updateDebtor(_id: any, debtor) {
    return this.http.put(this.debtorUrl + '/' + _id, debtor);
  }

  public deleteDebtor(_id: any) {
    return this.http.delete(this.debtorUrl + '/' + _id);
  }

  public updateCreditor(_id: any, creditor) {
    return this.http.put(this.creditorUrl + '/' + _id, creditor);
  }

  public deleteCreditor(_id: any) {
    return this.http.delete(this.creditorUrl + '/' + _id);
  }

  public purchaseRefNo(): Observable<any> {
    return this.http.get(this.purchaseUrl + 'inv')
  }
  public salesInvNo(): Observable<any> {
    return this.http.get(this.salesUrl + 'inv')
  }
}
