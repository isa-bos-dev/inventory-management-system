import { Component, signal } from '@angular/core';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  imports: [NgbCollapseModule],
  selector: 'app-navbar',
  styleUrl: './navbar.css',
  templateUrl: './navbar.html',
})
export class Navbar {
  // Signal to control the collapsed state of the responsive menu
  protected isMenuCollapsed = signal<boolean>(true);

  // Toggle mobile navigation menu visibility
  protected toggleMenu(): void {
    this.isMenuCollapsed.update(collapsed => !collapsed);
  }
}
