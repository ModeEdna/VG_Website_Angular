import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

interface PersonData {
  id: string | number;
  name: string;
  imageUrl?: string;
  bio: string;
  skills: string[];
  email: string;
  phone?: string;
  activeSection?: 'bio' | 'contact' | 'skills';
}

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  @Input() personData: PersonData | null = null;
  @Output() closed = new EventEmitter<void>();

  isOpen = false;

  open(person: PersonData) {
    this.personData = person;
    this.isOpen = true;
    document.body.classList.add('modal-open'); // Prevent background scrolling

    // Scroll to the active section if specified
    if (person.activeSection) {
      setTimeout(() => {
        const element = document.getElementById(
          person.activeSection + '-section'
        );
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }

  close() {
    this.isOpen = false;
    this.closed.emit();
    document.body.classList.remove('modal-open');
  }

  closeOnOverlayClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.close();
    }
  }
}
