import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface PaymentIntentRequest {
  amount: number;
  currency: string;
  campaignId: string;
  donorId: string;
}

interface PaymentIntentResponse {
  clientSecret: string;
  // Add other relevant properties from your backend response
}

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = 'http://localhost:8080/api/payments'; // Adjust API URL as needed

  constructor(private http: HttpClient) {}

  createPaymentIntent(paymentDetails: PaymentIntentRequest): Observable<PaymentIntentResponse> {
    return this.http.post<PaymentIntentResponse>(`${this.apiUrl}/create-intent`, paymentDetails);
  }

  // Add other payment-related methods if needed
  // e.g., confirmPayment, handleWebhook, etc.
}
