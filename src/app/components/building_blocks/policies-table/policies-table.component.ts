import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-policies-table',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './policies-table.component.html',
  styleUrl: './policies-table.component.css',
})
export class PoliciesTableComponent implements OnInit {
  policies: any[] = [];
  loading = true;
  error: string | null = null;
  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadPolicies();
  }

  loadPolicies(): void {
    this.http.get<{ policies: any[] }>('/json_files/policies.json').subscribe({
      next: (data) => {
        console.log('Data received:', data);
        this.policies = data.policies || [];
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading policies:', err);
        this.error = 'Failed to load policies data';
        this.loading = false;
        // Fallback data
        this.policies = [
          {
            name: 'Sample Policy',
            description: 'This is a sample policy description.',
            department: 'Sample Department',
            type: 'Sample Type',
          },
        ];
      },
    });
  }

  sortTable(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.policies.sort((a, b) => {
      const valueA = a[column];
      const valueB = b[column];
      if (valueA < valueB) {
        return this.sortDirection === 'asc' ? -1 : 1;
      } else if (valueA > valueB) {
        return this.sortDirection === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    });
  }
}
