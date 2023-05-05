import { Model } from 'src/app/models/model.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { Brand } from '../models/brand.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private brandUrl = "/api/brands";
  private modelUrl = "/api/mobile";

  constructor(private http: HttpClient) { }

  public getBrands(): Observable<any> {
    return this.http.get(this.brandUrl);

  }

  public addBrand(brand: Brand) {
    return this.http.post(this.brandUrl, brand);
  }

  public createModel(mobileModel) {
    return this.http.post(this.modelUrl, mobileModel)
  }

  public getMobileList(): Observable<any> {
    return this.http.get(this.modelUrl);
  }

  public updaeMobile(model: Model) {
    return this.http.put(this.modelUrl + `$(model._id)`, model)
  }
  public getMobileById() {

  }
}
