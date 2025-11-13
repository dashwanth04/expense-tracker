import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment'; // correct relative path

export interface Expense {
  _id?: string;
  title: string;
  amount: number;
  category?: string;
  date?: string;
}

// runtime-sanitize base URL to avoid double "/api"
const _rawApi = (environment && environment.apiUrl) ? environment.apiUrl : '';
const baseApi = _rawApi.replace(/\/+$/, '');              // remove trailing slashes
const safeBase = baseApi.endsWith('/api') ? baseApi.slice(0, -4) : baseApi;

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private apiUrl = safeBase + '/api/expenses';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    // withCredentials: true // uncomment if using cookie auth
  };

  constructor(private http: HttpClient) {}

  getExpenses(): Observable<Expense[]> {
    return this.http.get<Expense[]>(this.apiUrl, this.httpOptions).pipe(catchError(this.handleError));
  }

  addExpense(expense: Expense): Observable<Expense> {
    return this.http.post<Expense>(this.apiUrl, expense, this.httpOptions).pipe(catchError(this.handleError));
  }

  deleteExpense(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, this.httpOptions).pipe(catchError(this.handleError));
  }

  private handleError(err: HttpErrorResponse) {
    console.error('API Error:', err);
    return throwError(() => err);
  }
}
