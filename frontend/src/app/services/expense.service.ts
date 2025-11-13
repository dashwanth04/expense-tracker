import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

export interface Expense {
  _id?: string;
  title: string;
  amount: number;
  category?: string;
  date?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  // ❗ FIX: Backend route is /api/expenses not /expenses
  private apiUrl = environment.apiUrl + "/api/expenses";

  constructor(private http: HttpClient) {}

  // Get all expenses
  getExpenses(): Observable<Expense[]> {
    return this.http.get<Expense[]>(this.apiUrl);
  }

  // Add new expense
  addExpense(expense: Expense): Observable<Expense> {
    return this.http.post<Expense>(this.apiUrl, expense);
  }

  // Delete expense by ID
  deleteExpense(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
