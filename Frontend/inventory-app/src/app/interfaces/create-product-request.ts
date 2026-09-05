// Payload for creating a new product
export interface CreateProductRequest {
    code: string;
    name: string;
    minStock: number;
}
