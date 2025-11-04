import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Expense {
  _id?: string;
  title: string;
  amount: number;
  category?: string;
  date?: string;
}

@Component({
  selector: 'app-root',
  standalone: true,  // ✅ Angular 18 standalone
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  expenses: Expense[] = [];
  newExpense: Expense = { title: '', amount: 0, category: '' };
  apiUrl = 'http://localhost:4000/api/expenses';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getExpenses();
  }

  getExpenses() {
    this.http.get<Expense[]>(this.apiUrl).subscribe((data) => {
      this.expenses = data;
    });
  }

  addExpense() {
    if (!this.newExpense.title || !this.newExpense.amount) return;
    this.http.post<Expense>(this.apiUrl, this.newExpense).subscribe(() => {
      this.newExpense = { title: '', amount: 0, category: '' };
      this.getExpenses();
    });
  }

  deleteExpense(id?: string) {
    if (!id) return;
    this.http.delete(`${this.apiUrl}/${id}`).subscribe(() => {
      this.getExpenses();
    });
  }
}
