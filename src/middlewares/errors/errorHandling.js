import ErrorResponse from '../../utils/errorResponse.js';
export const routeNotFoundHandler = (req, res, next) => {
  if (!req.pathname) {
    res.status(404).send({
      success: false,
      message: `${req.protocol}://${req.get('host')}${
        req.originalUrl
      } route not found`,
    });
  }
};
export const errorHandler = async (err, req, res, next) => {
  console.log(err);
  let error = { ...err };
  error.message = err.message;
  //mongoose bad object id
  if (err.name === 'CastError') {
    const message = `resource not found with id of ${err.value}`;
    error = new ErrorResponse(message, 404);
  }
  if (err.message.includes('validation failed')) {
    return res.status(400).send({ success: false, error: err.message });
  }

  res.status(error.statusCode || 500).send({
    success: false,
    error: error.message || 'internal server error',
  });
};
