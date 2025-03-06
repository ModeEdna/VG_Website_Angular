import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-person-cards',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ModalComponent],
  templateUrl: './person-cards.component.html',
  styleUrl: './person-cards.component.css',
})
export class PersonCardsComponent implements OnInit {
  employees: any[] = [];
  loading: boolean = true;
  error: string | null = null;
  selectedContent: 'bio' | 'contact' | 'skills' = 'bio';

  @ViewChild(ModalComponent) modal!: ModalComponent;

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
          {
            name: 'John Doe',
            title: 'Developer',
            bio: 'John is an experienced developer with 10 years of industry experience.',
            skills: ['JavaScript', 'Angular', 'TypeScript', 'Node.js'],
            email: 'john.doe@example.com',
            phone: '(555) 123-4567',
          },
          {
            name: 'Jane Smith',
            title: 'Designer',
            bio: 'Jane is a creative designer specializing in UI/UX design.',
            skills: ['Figma', 'Adobe XD', 'CSS', 'Illustrator'],
            email: 'jane.smith@example.com',
            phone: '(555) 987-6543',
          },
        ];
      },
    });
  }

  openModal(employee: any, contentType: 'bio' | 'contact' | 'skills'): void {
    // Create personData object with appropriate content highlighted based on button clicked
    const personData = {
      id: employee.id || '',
      name: employee.name,
      imageUrl: employee.image || 'assets/placeholder-profile.jpg',
      bio: employee.bio || 'No biography available',
      skills: employee.skills || ['No skills listed'],
      email: employee.email || 'No email available',
      phone: employee.phone || '',
      activeSection: contentType,
    };

    this.modal.open(personData);
  }
}
