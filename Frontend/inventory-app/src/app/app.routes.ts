import { Routes } from '@angular/router';
import { InventoryPage } from './pages/inventory-page/inventory-page';
import { NewMovementPage } from './pages/new-movement-page/new-movement-page';
import { DashboardPage } from './pages/dashboard-page/dashboard-page';

export const routes: Routes = [
    // Default route: load inventory page when path is empty
  { path: '', component: InventoryPage},
   // Inventory stock listing route
  { path:"inventory", component: InventoryPage },

  // New movement registration route
  { path: 'newmovement', component: NewMovementPage},

  // Dashboard charts and indicators route
  { path: 'dashboard', component: DashboardPage }
];
