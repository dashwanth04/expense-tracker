import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment'; // ✅ Make sure you imported this

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

  // ✅ Correct variable name (use lowercase everywhere)
  private apiUrl = environment.apiUrl + "/expenses";

  constructor(private http: HttpClient) {}

  getExpenses(): Observable<Expense[]> {
    return this.http.get<Expense[]>(this.apiUrl);
  }

  addExpense(expense: Expense): Observable<Expense> {
    return this.http.post<Expense>(this.apiUrl, expense);
  }

  deleteExpense(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
