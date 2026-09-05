// Payload representing product details
export interface GetProductResponse {
    productId: number;
    code: string;
    name: string;
    minStock: number;
    currentStock: number;
}
