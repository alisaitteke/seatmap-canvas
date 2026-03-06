import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="container">
      <h1>Seatmap Canvas - Angular Examples</h1>
      
      <div class="tabs">
        <button 
          class="tab" 
          routerLink="/component" 
          routerLinkActive="active">
          Component
        </button>
        <button 
          class="tab" 
          routerLink="/directive" 
          routerLinkActive="active">
          Directive
        </button>
        <button 
          class="tab" 
          routerLink="/service" 
          routerLinkActive="active">
          Service
        </button>
      </div>

      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    h1 {
      margin-bottom: 30px;
      color: #2c3e50;
    }
  `]
})
export class AppComponent {}
