import { Component, effect, inject, signal } from '@angular/core';
import { GetInventoryResponse } from '../../interfaces/get-inventory-response';
import { InventoryService } from '../../services/inventory-service';
import { GetQueryInventoryRequest } from '../../interfaces/get-query-inventory-request';
import { NgbModal, NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { ProductModal } from '../../components/product-modal/product-modal';

@Component({
  selector: 'app-inventory-page',
  imports: [NgbPagination],
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
  private modalService = inject(NgbModal);

  private trigger = signal(false)

  constructor() {
    // Reactive effect triggered automatically whenever currentPage or pageSize are read
    effect(() => {

      this.trigger();

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

  // Open product creation modal
  open(): void {
    this.modalService.open(ProductModal)
    // Subscribe to modal resolution
    .result.then(
      (result) => {
        if (result === 'save') {
          console.log('product saved')
          this.trigger.update(v => !v);
      }
    }
    )
  }
}
