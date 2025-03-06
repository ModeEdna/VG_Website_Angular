import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-person-cards',
  standalone: true, // Add this
  imports: [CommonModule], // Add CommonModule for ngFor, ngIf, etc.
  templateUrl: './person-cards.component.html',
  styleUrl: './person-cards.component.css',
})
export class PersonCardsComponent {
  // Sample data
  employees = [
    {
      id: 1,
      name: 'Jane Doe',
      title: 'Senior Developer',
      image: 'assets/images/placeholder.jpg',
      description: 'Full-stack developer with 10 years of experience.',
    },
    {
      id: 2,
      name: 'John Smith',
      title: 'UX Designer',
      image: 'assets/images/placeholder.jpg',
      description: 'Specializes in user research and interface design.',
    },
  ];
}
