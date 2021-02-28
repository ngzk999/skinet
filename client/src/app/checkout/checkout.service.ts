import { Injectable, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { IDeliveryMethod } from '../shared/models/deliveryMethod';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { IOrderToCreate } from '../shared/models/order';


@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  baseUrl = environment.apiUrl

  constructor(private http: HttpClient) { }

  getDeliveryMethod() {
    return this.http.get(this.baseUrl + 'orders/deliveryMethods').pipe(
      map((dm: IDeliveryMethod[]) => {
        return dm.sort((a, b) => b.price - a.price);
        })
    );
  }

  createOrder(order: IOrderToCreate) {
    return this.http.post(this.baseUrl + 'orders', order);
  }
}
