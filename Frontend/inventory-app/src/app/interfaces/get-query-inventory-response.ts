import { GetInventoryResponse } from "./get-inventory-response";

// Paginated envelope containing items and pagination metadata
export interface GetQueryInventoryResponse {
    items: GetInventoryResponse[];
    page: number;
    pageSize: number;
    totalItems: number;
}
