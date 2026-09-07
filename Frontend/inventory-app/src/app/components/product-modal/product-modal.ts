import { Component, inject, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../../services/product-service';
import Swal from 'sweetalert2';
import { CreateProductRequest } from '../../interfaces/create-product-request';

@Component({
  selector: 'app-product-modal',
  imports: [FormField],
  styleUrl: './product-modal.css',
  templateUrl: './product-modal.html',
})
export class ProductModal {
  // Inject the NgbActiveModal and ProductService into the component
  protected activeModal = inject(NgbActiveModal);
  private productService = inject(ProductService);

  // Create a signal to hold the product model and form
  protected productModel = signal({code:'', name:'', minStock:1});
  protected productForm = form(this.productModel)

  // Persist product via API
  protected save(): void {
    // Extract the form values and create a CreateProductRequest object
    const {code, name, minStock} = this.productForm().value();
    // Create a request object with the form values
    const request: CreateProductRequest = {
      code: code,
      name: name,
      minStock: minStock
    };

    this.productService.create(request).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          // Close the modal and show a success message
          this.activeModal.close('save');
          Swal.fire({
            text: 'Product registered successfully',
            icon: 'success'
          });
        } else {
          // Show an error message if the response is not successful
          Swal.fire({
            text: response.message || 'Error registering product',
            icon: 'error'
          });
        }
      },
      error: (e) => {e.console.error();}
    });
  }
}
