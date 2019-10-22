class Response {
  static ok(res, data, statusCode = 200) {
    return res.status(statusCode).json({
      status: 'success',
      data
    });
  }

  static created(res, data, statusCode = 201) {
    return res.status(statusCode).json({
      status: 'success',
      data
    });
  }

  static error(res, errorType, message, errorDetails, statusCode = 500) {
    return res.status(statusCode).json({
      status: 'fail',
      errorType,
      message,
      errorDetails
    });
  }

  static unauthorized(res, message) {
    return res.status(401).json({
      status: 'fail',
      errorType: 'Unauthorized',
      message
    });
  }

  static forbidden(res, message) {
    return res.status(403).json({
      status: 'fail',
      errorType: 'Forbidden',
      message
    });
  }

  static notFound(res, message) {
    return res.status(404).json({
      status: 'fail',
      errorType: 'Not Found',
      message
    });
  }

  static badRequest(res, message) {
    return res.status(400).json({
      status: 'fail',
      errorType: 'Bad Request',
      message
    });
  }
}

export default Response;
