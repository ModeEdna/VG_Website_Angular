import { Component, HostListener } from '@angular/core';
import { PoliciesTableComponent } from '../../building_blocks/policies-table/policies-table.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-policies-and-procedures',
  imports: [PoliciesTableComponent, CommonModule],
  templateUrl: './policies-and-procedures.component.html',
  styleUrls: ['./policies-and-procedures.component.css'],
})
export class PoliciesAndProceduresComponent {
  showModal = false;

  openModal(event?: MouseEvent) {
    if (event) {
      event.stopPropagation();
    }
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const modalContent = document.querySelector('.modal-content');
    if (
      this.showModal &&
      modalContent &&
      !modalContent.contains(event.target as Node)
    ) {
      this.closeModal();
    }
  }
}
