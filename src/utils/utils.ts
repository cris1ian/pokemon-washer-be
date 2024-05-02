// Utility function to generate success response
function getSuccessResponse(data: any) {
    return { success: true, data };
}

// Utility function to generate error response
function getErrorResponse(message: string, error: string | number) {
    return { success: false, message, error };
}

module.exports = { getSuccessResponse, getErrorResponse };
