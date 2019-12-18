class Response {
  static success(res, response) {
    return res.status(response.statusCode).json({
      status: response.status,
      data: response.resource
    });
  }

  static error(res, response) {
    return res.status(response.statusCode).json({
      status: response.status,
      message: response.message
    });
  }

  static unauthorized(res, message) {
    return res.status(401).json({
      status: false,
      message
    });
  }

  static forbidden(res, message) {
    return res.status(403).json({
      status: false,
      message
    });
  }

  static notFound(res, message) {
    return res.status(404).json({
      status: false,
      message
    });
  }

  static badRequest(res, message) {
    return res.status(400).json({
      status: false,
      message
    });
  }

  static successResponseObject(resource, statusCode = 200) {
    return { status: true, statusCode, resource };
  }

  static failureResponseObject(statusCode, message) {
    return { status: false, statusCode, message };
  }

  static serverErrorResponseObject() {
    return {
      status: false,
      statusCode: 500,
      message: 'Unable to perform this action at this time. Try again later.'
    };
  }

  static httpResponse(res, response) {
    if (response.status) {
      return Response.success(res, response);
    }
    return Response.error(res, response);
  }
}

export default Response;
