import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { environment } from '../environments/environment';

interface Expense {
  _id?: string;
  title: string;
  amount: number;
  category?: string;
  date?: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  expenses: Expense[] = [];

  newExpense: Expense = { 
    title: '', 
    amount: 0, 
    category: '' 
  };

  // 🔥 FIX: Do NOT hardcode localhost — use environment variable
  apiUrl = `${environment.apiUrl}/api/expenses`;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getExpenses();
  }

  // Fetch all expenses
  getExpenses() {
    this.http.get<Expense[]>(this.apiUrl).subscribe({
      next: (data) => (this.expenses = data),
      error: (err) => console.error('Error loading expenses:', err)
    });
  }

  // Add a new expense
  addExpense() {
    if (!this.newExpense.title || !this.newExpense.amount) return;

    this.http.post<Expense>(this.apiUrl, this.newExpense).subscribe({
      next: () => {
        this.newExpense = { title: '', amount: 0, category: '' };
        this.getExpenses();
      },
      error: (err) => console.error('Error adding expense:', err)
    });
  }

  // Delete expense
  deleteExpense(id?: string) {
    if (!id) return;

    this.http.delete(`${this.apiUrl}/${id}`).subscribe({
      next: () => this.getExpenses(),
      error: (err) => console.error('Error deleting:', err)
    });
  }
}
