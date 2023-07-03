import { Model } from 'src/app/models/model.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Brand } from '../models/brand.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  apiUrl = environment.apiUrl;

  private brandUrl = this.apiUrl + "/api/brands";
  private modelUrl = this.apiUrl + "/api/mobile";

  constructor(private http: HttpClient) { }

  public getBrands(): Observable<any> {
    return this.http.get(this.brandUrl + '/all');

  }

  public addBrand(brand: Brand) {
    return this.http.post(this.brandUrl, brand);
  }

  public createModel(mobileModel) {
    return this.http.post(this.modelUrl, mobileModel)
  }

  public getMobileList(): Observable<any> {
    return this.http.get(this.modelUrl + '/all');
  }

  public updateMobile(model: Model, _id: string) {
    return this.http.put(this.modelUrl + `/${_id}`, model)
  }

  public getMobileById(Id: any): Observable<any> {
    return this.http.get(this.modelUrl + `/${Id}`)
  }

  public getMobileByBrand(brandName: any): Observable<any> {
    return this.http.get(this.modelUrl + `/brand/${brandName}`)
  }

  public imeiList(modelId: string): Observable<any> {
    return this.http.get(this.apiUrl + '/api/imei/' + modelId)
  }

  public unsoldImeiList(modelId: string): Observable<any> {
    return this.http.get(this.apiUrl + '/api/unsoldimei/' + modelId)
  }

  public deleteMobile(_id: string) {
    return this.http.delete(this.modelUrl + '/' + _id)
  }

}