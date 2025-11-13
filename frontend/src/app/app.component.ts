// src/app/app.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ExpenseService, Expense } from './services/expense.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  expenses: Expense[] = [];
  newExpense: Expense = { title: '', amount: 0, category: '', date: '' };

  constructor(private expenseService: ExpenseService) {}

  ngOnInit(): void {
    this.getExpenses();
  }

  getExpenses() {
    this.expenseService.getExpenses().subscribe({
      next: (data) => this.expenses = data,
      error: (err) => console.error('Error loading expenses:', err)
    });
  }

  addExpense() {
    if (!this.newExpense.title || !this.newExpense.amount) return;

    // ensure date is ISO (optional)
    const payload: Expense = {
      ...this.newExpense,
      date: this.newExpense.date ? new Date(this.newExpense.date).toISOString() : undefined
    };

    this.expenseService.addExpense(payload).subscribe({
      next: () => {
        this.newExpense = { title: '', amount: 0, category: '', date: '' };
        this.getExpenses();
      },
      error: (err) => console.error('Error adding expense:', err)
    });
  }

  deleteExpense(id?: string) {
    if (!id) return;
    this.expenseService.deleteExpense(id).subscribe({
      next: () => this.getExpenses(),
      error: (err) => console.error('Error deleting expense:', err)
    });
  }
}
