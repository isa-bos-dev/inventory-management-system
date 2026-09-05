import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-navbar',
  imports: [NgbCollapseModule, RouterLink, RouterLinkActive],
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
