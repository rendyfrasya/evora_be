const { StatusCodes } = require('http-status-codes');
const CustomApiError = require('./custom-api-errors');

class BadRequestError extends CustomApiError {
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.BAD_REQUEST;
    }
}
module.exports = BadRequestError;