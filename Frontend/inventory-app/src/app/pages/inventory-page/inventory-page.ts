import { Component, effect, inject, signal } from '@angular/core';
import { GetInventoryResponse } from '../../interfaces/get-inventory-response';
import { InventoryService } from '../../services/inventory-service';
import { GetQueryInventoryRequest } from '../../interfaces/get-query-inventory-request';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';

@Component({
  imports: [NgbPagination],
  selector: 'app-inventory-page',
  styleUrl: './inventory-page.css',
  templateUrl: './inventory-page.html',
})
export class InventoryPage {

  // Define signals for pagination and inventory data
  protected currentPage = signal(1);
  protected pageSize = signal(5);
  protected totalRecords = signal(0);
  protected inventory = signal<GetInventoryResponse[]>([]);

   // Inject HTTP service
  private inventoryService = inject(InventoryService)

  constructor() {
    // Reactive effect triggered automatically whenever currentPage or pageSize are read
    effect(() => {
      const query: GetQueryInventoryRequest = {
        page: this.currentPage(),
        pageSize: this.pageSize()
      };

      // Fetch paginated inventory data from the service
      this.inventoryService.get(query).subscribe({
        next: (response) => {
          if (response.isSuccess) {
            // Destructure payload and update signals
            const { totalItems, items } = response.data;
            this.inventory.set(items);
            this.totalRecords.set(totalItems);
          }
        },
      });
    });
  }
}
