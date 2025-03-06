import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-person-cards',
  imports: [CommonModule],
  templateUrl: './person-cards.component.html',
  styleUrl: './person-cards.component.css',
})
export class PersonCardsComponent implements OnInit {
  people: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('/assets/json_files/people.json').subscribe((data) => {
      this.people = data;
    });
  }
}
