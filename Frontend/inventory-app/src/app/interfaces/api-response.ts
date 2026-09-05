// Generic API response contract
export interface ApiResponse<T> {
    isSuccess: boolean;
    message: string;
    data: T;
}
