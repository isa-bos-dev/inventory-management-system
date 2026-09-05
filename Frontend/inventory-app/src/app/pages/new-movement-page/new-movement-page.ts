import { Component, inject, signal } from '@angular/core';
import { form, required, FormField } from '@angular/forms/signals';
import { NgbNavModule, NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../../services/product-service';
import { InventoryService } from '../../services/inventory-service';
import { GetProductResponse } from '../../interfaces/get-product-response';
import {FormsModule} from '@angular/forms';
import { catchError, debounceTime, distinctUntilChanged, map, Observable, of, OperatorFunction, switchMap } from 'rxjs';
import Swal from 'sweetalert2';
import { CreateMovementRequest } from '../../interfaces/create-movement-request';

@Component({
  selector: 'app-new-movement-page',
  imports: [NgbNavModule, NgbTypeahead, FormsModule, FormField],
  styleUrl: './new-movement-page.css',
  templateUrl: './new-movement-page.html',
})
export class NewMovementPage {

  // Signal to track the active tab in the navigation
  protected readonly tabActive = signal(1);

  // Initial data structure for the new movement form
  protected initialData = {
    type: '1',
    date: '',
    observation: '',
    detail:[] as {
      id: number;
      name: string;
      quantity: number;
    }[],
  };

  // Signal to hold the current state of the movement model
  private movementModel = signal(this.initialData);

  // Form configuration for the new movement, including validation rules
  protected movementForm= form(this.movementModel,(path)=>{
    required(path.type);
    required(path.date);
    required(path.observation);
  })

  // Injecting the ProductService and InventoryService for use in this component
  private productService = inject(ProductService);
  private inventoryService = inject(InventoryService);

  // Signal to hold the selected product details, initialized to null
  protected productSelected = signal<GetProductResponse | null>(null);
  // Signal to hold the quantity of the selected product, initialized to 1
  protected productQuantity = signal<number>(1);

  // Signal to hold the list of products retrieved from the search, initialized to an empty array
  protected search: OperatorFunction<string, readonly GetProductResponse[]> = 
  (text$: Observable<string>) => text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => {
        if (term.trim().length < 2) return of([]);
        return this.productService.get(term).pipe(
          map(response => response.isSuccess ? response.data : ([]) as GetProductResponse[]),
          catchError(() => of<GetProductResponse[]>([]))
        )
      })
    )

  // Formatter function to display product details in the typeahead dropdown
  protected formatter = (product: GetProductResponse) => {
    if(typeof product?.productId === 'undefined') return '';
    return `${product.code} - ${product.name}`;
  };

  // Method to add the selected product and quantity to the movement detail
  protected add(): void {
    if (this.productSelected() == null || typeof this.productSelected()?.productId === 'undefined') {
      Swal.fire({
        text: 'Please select a valid product',icon: 'error'});
      return;
    }

    // Update the movement form's detail array with the selected product and quantity
    this.movementForm.detail().value.update(current => ([
      ...current,
      {
        // Add the selected product's ID, name, and specified quantity to the detail array
        id: this.productSelected()?.productId!,
        name: this.productSelected()?.name!,
        quantity: this.productQuantity()
      }
    ]));

    // Reset the selected product and quantity signals to their initial states
    this.productSelected.set(null);
    this.productQuantity.set(1);
  }

  // Method to remove a product from the movement detail based on its ID
  protected delete(id: number): void {
    this.movementForm.detail().value.update(current => current.filter((item,i) => item.id !== id));
  }

  // Save the full movement transaction to the database via API
  protected save(): void {
    // Validate required header fields
    if (this.movementForm().invalid()) {
      Swal.fire({
        text: 'You must complete all the information',
        icon: 'error'
      });
      return;
    }
    
    // Validate that at least one product is included in the movement detail
    const { type, date, observation, detail } = this.movementForm().value();

    // Construct the payload for the API request
    const request: CreateMovementRequest = {
      movementTypeValue: Number(type),
      movementDate: date,
      observation: observation,
      details: detail.map(item => ({
        productId: item.id,
        quantity: item.quantity
      }))
    }

    // Send payload to backend
    this.inventoryService.create(request).subscribe({
      next: response => {
        // Handle the API response, providing user feedback based on success or failure
        if (response.isSuccess) {
          // Reset the movement model to its initial state after successful save
          this.movementModel.set(this.initialData);
          // Reset the form state to its initial configuration
          this.movementForm().reset();
          // Display success message to the user
          Swal.fire({
            text: 'Movement registered successfully',
            icon: 'success'
          });
          this.tabActive.set(1); // Switch back to the first tab after saving
        } else {
          Swal.fire({
            text: response.message,
            icon: 'error'
          });
        }
      },
      error: (e) => {console.error(e.error);}
    });
  }
}
