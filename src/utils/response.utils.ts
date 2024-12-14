export class ResponseUtils {
  public static getSuccessResponse(message: string, data: any) {
    return { message, data };
  }

  public static getErrorResponse(message: string, error: unknown) {
    return { success: false, message, error };
  }
}
