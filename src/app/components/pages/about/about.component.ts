import { Component } from '@angular/core';
import { PersonCardsComponent } from '../../building_blocks/person-cards/person-cards.component';

@Component({
  selector: 'app-about',
  imports: [PersonCardsComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent {}
