namespace InventoryWebApi.DTOs
{
    public class ApiResponse<T>
    {
        // Indicates if the operation was completed successfully
        public bool IsSuccess { get; set; }

        // Descriptive status or error message
        public string Message { get; set; } = string.Empty;

        // Generic payload carrying the requested data
        public T? Data { get; set; }

        // Helper method for successful operations
        public static ApiResponse<T> Success(T? data, string message = "")
        {
            return new ApiResponse<T>
            {
                IsSuccess = true,
                Message = message,
                Data = data
            };
        }

        // Helper method for failed operations
        public static ApiResponse<T> Failure(string message)
        {
            return new ApiResponse<T>
            {
                IsSuccess = false,
                Message = message,
            };
        }
    }
}
