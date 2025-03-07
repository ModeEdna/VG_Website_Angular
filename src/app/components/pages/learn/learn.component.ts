import { Component } from '@angular/core';
import { LearnCardComponent } from '../../building_blocks/learn-card/learn-card.component';

@Component({
  selector: 'app-learn',
  imports: [LearnCardComponent],
  templateUrl: './learn.component.html',
  styleUrl: './learn.component.css',
})
export class LearnComponent {}
