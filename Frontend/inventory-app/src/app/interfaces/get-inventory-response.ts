// Single row item representing product stock state
export interface GetInventoryResponse {
    productCode: string;
    productName: string;
    minStock: number;
    currentStock: number;
    status: string;
}
