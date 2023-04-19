import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Model } from '../models/model.model';
import { Brand } from '../models/brand.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private brandUrl = "/api/brands";
  private modelUrl = "/api/model";

  constructor(private http: HttpClient) { }

  public getBrands(): Observable<any> {
    return this.http.get(this.brandUrl);

  }

  public addBrand(brand: Brand) {
    return this.http.post(this.brandUrl, brand);
  }

  public createModel(mobileModel: Model) {
    return this.http.post(this.modelUrl, mobileModel)
  }
}
