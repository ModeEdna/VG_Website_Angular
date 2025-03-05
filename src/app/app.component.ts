import { Component } from '@angular/core';
// import header component
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [HeaderComponent, FooterComponent], // Import the standalone component here
})
export class AppComponent {
  title = 'VG_Website_Angular';
}
