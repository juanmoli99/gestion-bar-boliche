export class ApiResponseDto<T> {
  success: boolean;

  message: string;

  data: T | null;

  errors: string[] | null;

  timestamp: string;

  constructor(params: {
    success: boolean;
    message: string;
    data?: T | null;
    errors?: string[] | null;
  }) {
    this.success = params.success;
    this.message = params.message;
    this.data = params.data ?? null;
    this.errors = params.errors ?? null;
    this.timestamp = new Date().toISOString();
  }

  static success<T>(message: string, data?: T): ApiResponseDto<T> {
    return new ApiResponseDto<T>({
      success: true,
      message,
      data,
    });
  }

  static error(message: string, errors?: string[]): ApiResponseDto<null> {
    return new ApiResponseDto<null>({
      success: false,
      message,
      errors,
    });
  }
}