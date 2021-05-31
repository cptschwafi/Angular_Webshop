import { FilterService } from './filter.service';
import { HttpClient} from '@angular/common/http';
import { Product } from './../models/product';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { productsUrl } from '../config/apiconfig';


@Injectable({
  providedIn: 'root'
})
export class ProductService {


  constructor(private filterservice: FilterService, private http: HttpClient) {}

  getallProducts(): Observable<Product[]>
  {
    return this.http.get<Product[]>(productsUrl);
  }
  // get Products with filters
  getProducts(query: string): Observable<Product[]>
  {
    return this.http.get<Product[]>(productsUrl + '/' + query);
  }

  getProduct(id: string): Observable<Product>
  {
     return this.http.get<Product>(productsUrl + '/' + id);
  }
}
