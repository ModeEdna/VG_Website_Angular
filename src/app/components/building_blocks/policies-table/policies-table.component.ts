import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-policies-table',
  imports: [CommonModule],
  templateUrl: './policies-table.component.html',
  styleUrl: './policies-table.component.css',
})
export class PoliciesTableComponent implements OnInit {
  policies: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<{ policies: any[] }>('/json_files/policies.json').subscribe({
      next: (data) => {
        this.policies = data.policies || [];
      },
      error: (err) => console.error(err),
    });
  }
}
