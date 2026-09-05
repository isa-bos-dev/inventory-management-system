import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { CreateMovementRequest } from '../interfaces/create-movement-request';
import { Observable } from 'rxjs';
import { ApiResponse } from '../interfaces/api-response';
import { GetQueryInventoryRequest } from '../interfaces/get-query-inventory-request';
import { GetQueryInventoryResponse } from '../interfaces/get-query-inventory-response';
import { GetMovementChartResponse } from '../interfaces/get-movement-chart-response';
import { GetProductReportResponse } from '../interfaces/get-product-report-response';

@Service()
export class InventoryService {
    // Inject Angular HTTP client
  private http = inject(HttpClient);

  // Base endpoint pointing to inventory API controller
  private endpoint = `${environment.apiUrl}/inventory`;

  // POST: api/inventory - Register stock movement
  create(request: CreateMovementRequest): Observable<ApiResponse<number>> {
    return this.http.post<ApiResponse<number>>(this.endpoint, request);
  }

  // GET: api/inventory?page=X&pageSize=Y - Retrieve paginated inventory list
  get(request: GetQueryInventoryRequest): Observable<ApiResponse<GetQueryInventoryResponse[]>> {
    return this.http.get<ApiResponse<GetQueryInventoryResponse[]>>(
      `${this.endpoint}?page=${request.page}&pageSize=${request.pageSize}`
    );
  }

  // GET: api/inventory/movement-report - Retrieve last 5 days movement chart data
  getMovementReport(): Observable<ApiResponse<GetMovementChartResponse[]>> {
    return this.http.get<ApiResponse<GetMovementChartResponse[]>>(
        `${this.endpoint}/GetMovementReport`);
  }

  // GET: api/inventory/low-stock-report - Retrieve products below minimum safety threshold
  getProductReport(): Observable<ApiResponse<GetProductReportResponse[]>> {
    return this.http.get<ApiResponse<GetProductReportResponse[]>>(
        `${this.endpoint}/GetProductReport`);
  }
}
