import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <header class="app-header">
      <h1>💊 Pharmacy Inventory</h1>
    </header>
    <main class="app-main">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    .app-header {
      background-color: #1e3a5f;
      color: #fff;
      padding: 16px 24px;
    }
    .app-main {
      padding: 24px;
      max-width: 1100px;
      margin: 0 auto;
    }
  `]
})
export class AppComponent {}
