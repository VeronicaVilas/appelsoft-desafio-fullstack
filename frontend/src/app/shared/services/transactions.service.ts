import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Transaction } from '../interfaces/transaction.interface';
import { TransactionPayload } from '../interfaces/payload-product.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  httpClient = inject(HttpClient);

  get() {
    const token = localStorage.getItem('token');
    return this.httpClient.get<Transaction[]>(`http://localhost:8000/api/transacoes`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
  }

  post(payload: TransactionPayload) {
    const token = localStorage.getItem('token');
    return this.httpClient.post(`http://localhost:8000/api/transacoes`, payload, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
  }

  put(id: string, payload: TransactionPayload) {
    const token = localStorage.getItem('token');
    return this.httpClient.put(`http://localhost:8000/api/transacoes/${id}`, payload, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
  }

  delete(id: string) {
    const token = localStorage.getItem('token');
    return this.httpClient.delete(`http://localhost:8000/api/transacoes/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
  }

  getSummary(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.httpClient.get<any>(`http://localhost:8000/api/resumo`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
  }
}
