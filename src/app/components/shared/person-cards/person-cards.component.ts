import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-person-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './person-cards.component.html',
  styleUrl: './person-cards.component.css',
})
export class PersonCardsComponent implements OnInit {
  employees: any[] = [];
  loading: boolean = true;
  error: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.http.get<{ people: any[] }>('/json_files/people.json').subscribe({
      next: (data) => {
        console.log('Data received:', data);
        this.employees = data.people || [];
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading employees:', err);
        this.error = 'Failed to load employee data';
        this.loading = false;
        // Fallback data
        this.employees = [
          { name: 'John Doe', title: 'Developer' },
          { name: 'Jane Smith', title: 'Designer' },
        ];
      },
    });
  }
}
