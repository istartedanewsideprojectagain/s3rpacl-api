class ErrorHandler extends Error {
    constructor(statusCode, message) {
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}

const handleError = (err, res) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.statusCode = statusCode;
    return res.json({
        error: true,
        message,
    });
};

module.exports = {
    ErrorHandler,
    handleError,
};
