import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, retry, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  apiURL = environment.apiURLs.payment_api_URL;

  priceId = environment.stripe.priceId;

  constructor(private http: HttpClient) {}

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  createCustomer(name: string, email: string, token: string) {
    this.httpOptions.headers = this.httpOptions.headers.delete('Authorization');
    this.httpOptions.headers = this.httpOptions.headers.append(
      'Authorization',
      token
    );

    return this.http.post<any>(
      this.apiURL + '/ksea-payment/customers/create',
      JSON.stringify({
        name: name,
        email: email,
      }),
      this.httpOptions
    );
  }

  createCustomerWithoutToken(name: string, email: string) {
    return this.http.post<any>(
      this.apiURL + '/ksea-payment/customers/createWithoutToken',
      JSON.stringify({
        name: name,
        email: email,
      }),
      this.httpOptions
    );
  }

  createRegular35Subscription(token: string, customerId?: string) {
    this.httpOptions.headers = this.httpOptions.headers.delete('Authorization');
    this.httpOptions.headers = this.httpOptions.headers.append(
      'Authorization',
      token
    );
    return this.http.post<any>(
      this.apiURL + '/ksea-payment/subscription/create',
      JSON.stringify({
        customerId: customerId,
        priceId: this.priceId,
      }),
      this.httpOptions
    );
  }

  updateSubscription(
    paymentMethodId: string,
    token: string,
    customerId?: string
  ) {
    this.httpOptions.headers = this.httpOptions.headers.delete('Authorization');
    this.httpOptions.headers = this.httpOptions.headers.append(
      'Authorization',
      token
    );

    return this.http.post<any>(
      this.apiURL + '/ksea-payment/subscription/update',
      JSON.stringify({
        customerId: customerId,
        paymentMethodId: paymentMethodId,
      }),
      this.httpOptions
    );
  }

  retrieveSubscription(token: string, subscriptionId?: string) {
    this.httpOptions.headers = this.httpOptions.headers.delete('Authorization');
    this.httpOptions.headers = this.httpOptions.headers.append(
      'Authorization',
      token
    );

    return this.http.post<any>(
      this.apiURL + '/ksea-payment/subscription/retrieve',
      JSON.stringify({
        subscriptionId: subscriptionId,
      }),
      this.httpOptions
    );
  }
  findSubscription(token: string, subscriptionId?: string) {
    this.httpOptions.headers = this.httpOptions.headers.delete('Authorization');
    this.httpOptions.headers = this.httpOptions.headers.append(
      'Authorization',
      token
    );

    return this.http.get<any>(
      this.apiURL + '/ksea-payment/subscription/' + subscriptionId,
      this.httpOptions
    );
  }

  cancelSubscription(token: string, subscriptionId?: string) {
    this.httpOptions.headers = this.httpOptions.headers.delete('Authorization');
    this.httpOptions.headers = this.httpOptions.headers.append(
      'Authorization',
      token
    );

    return this.http.post<any>(
      this.apiURL + '/ksea-payment/subscription/cancel',
      JSON.stringify({
        subscriptionId: subscriptionId,
      }),
      this.httpOptions
    );
  }

  reactiveSubscription(
    token: string,
    subscriptionId?: string,
    customerId?: string
  ) {
    this.httpOptions.headers = this.httpOptions.headers.delete('Authorization');
    this.httpOptions.headers = this.httpOptions.headers.append(
      'Authorization',
      token
    );

    return this.http.post<any>(
      this.apiURL + '/ksea-payment/subscription/reactive',
      JSON.stringify({
        customerId: customerId,
        subscriptionId: subscriptionId,
        priceId: this.priceId,
      }),
      this.httpOptions
    );
  }

  payOnetime(
    tokenId: string,
    price: number,
    email: string,
    token: string,
    paymentDescription: string,
    customerId?: string
  ) {
    this.httpOptions.headers = this.httpOptions.headers.delete('Authorization');
    this.httpOptions.headers = this.httpOptions.headers.append(
      'Authorization',
      token
    );

    return this.http.post<any>(
      this.apiURL + '/ksea-payment/pay',
      JSON.stringify({
        customerId: customerId,
        tokenId: tokenId,
        price: price,
        email: email,
        paymentDescription: paymentDescription,
      }),
      this.httpOptions
    );
  }

  payOnetimeWithoutToken(
    tokenId: string,
    price: number,
    email: string,
    paymentDescription: string,
    customerId?: string
  ) {
    return this.http.post<any>(
      this.apiURL + '/ksea-payment/payWithoutToken',
      JSON.stringify({
        customerId: customerId,
        tokenId: tokenId,
        price: price,
        email: email,
        paymentDescription: paymentDescription,
      }),
      this.httpOptions
    );
  }
}
