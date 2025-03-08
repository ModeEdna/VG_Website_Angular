import { Component } from '@angular/core';
import { PoliciesTableComponent } from '../../building_blocks/policies-table/policies-table.component';
import { ModalComponent } from '../../building_blocks/modal/modal.component';

@Component({
  selector: 'app-policies-and-procedures',
  imports: [PoliciesTableComponent, ModalComponent],
  templateUrl: './policies-and-procedures.component.html',
  styleUrl: './policies-and-procedures.component.css',
})
export class PoliciesAndProceduresComponent {
  showModal = false;

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
}
