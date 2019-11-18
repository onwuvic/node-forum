class Response {
  static ok(res, response, statusCode = 200) {
    return res.status(statusCode).json({
      status: response.status,
      data: response.resource
    });
  }

  static created(res, response, statusCode = 201) {
    return res.status(statusCode).json({
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
}

export default Response;
