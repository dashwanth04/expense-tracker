import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
 private API_URL = `${environment.apiUrl}/api/expenses`;



  constructor(private http: HttpClient) {}

  getExpenses(): Observable<Expense[]> {
    return this.http.get<Expense[]>(this.API_URL);
  }

  addExpense(expense: Expense): Observable<Expense> {
    return this.http.post<Expense>(this.API_URL, expense);
  }

  deleteExpense(id: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`);
  }
}
