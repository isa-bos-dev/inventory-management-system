import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { CreateProductRequest } from '../interfaces/create-product-request';
import { Observable } from 'rxjs';
import { ApiResponse } from '../interfaces/api-response';
import { GetProductReportResponse } from '../interfaces/get-product-report-response';

@Service()
export class ProductService {
    // Inject Angular HTTP client
    private http = inject(HttpClient);

    // Base endpoint pointing to product API controller
    private endpoint = `${environment.apiUrl}/product`;

    // POST: api/product - Create a new product returning generated ID
    create(request: CreateProductRequest): Observable<ApiResponse<number>> {
        return this.http.post<ApiResponse<number>>(this.endpoint, request);
    }

    // GET: api/product?searchTerm=term - Retrieve products with optional filter
    get(searchTerm: string): Observable<ApiResponse<GetProductReportResponse[]>> {
        return this.http.get<ApiResponse<GetProductReportResponse[]>>(
            `${this.endpoint}?searchTerm=${searchTerm}`);
    }
}
