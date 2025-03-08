import { Component } from '@angular/core';
import { PoliciesTableComponent } from '../../building_blocks/policies-table/policies-table.component';

@Component({
  selector: 'app-policies-and-procedures',
  imports: [PoliciesTableComponent],
  templateUrl: './policies-and-procedures.component.html',
  styleUrl: './policies-and-procedures.component.css',
})
export class PoliciesAndProceduresComponent {}
