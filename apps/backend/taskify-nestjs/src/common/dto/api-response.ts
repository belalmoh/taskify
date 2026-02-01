export interface ApiSuccessResponse<T> {
    success: true;
    data: T;
    timestamp: string;
    message?: string;
}

export interface ApiErrorResponse {
    success: false;
    error: {
        code: string;
        message: string;
        details?: any;
    };
    timestamp: string;
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;