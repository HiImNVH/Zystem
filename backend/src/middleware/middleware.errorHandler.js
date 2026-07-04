// backend/src/middleware/middleware.errorHandler.js
// Xu ly loi toan cuc cho Express — bat tat ca error chua duoc xu ly

/**
 * Middleware xu ly loi toan cuc
 * Dat cuoi cung trong chuoi app.use() cua index.js
 */
function globalErrorHandler(error, req, res, next) {
    const statusCode = error.statusCode || 500;
    const isDev = process.env.NODE_ENV === 'development';

    console.error(`[ERROR] ${req.method} ${req.path} — ${error.message}`);

    return res.status(statusCode).json({
        success: false,
        message: statusCode === 500 ? 'Loi he thong noi bo. Vui long thu lai sau.' : error.message,
        // Chi hien stack trace trong moi truong development
        ...(isDev && { stack: error.stack })
    });
}

/**
 * Middleware bat route khong ton tai (404)
 */
function notFoundHandler(req, res) {
    return res.status(404).json({
        success: false,
        message: `Endpoint khong ton tai: ${req.method} ${req.path}`
    });
}

module.exports = {
    globalErrorHandler,
    notFoundHandler
};
