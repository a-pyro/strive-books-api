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
  if (err.origin === 'multerExt') {
    return res.status(err.statusCode).send({
      success: false,
      message: err.message,
    });
  }

  if (err.field && err.field !== 'productPic') {
    return res.status(400).send({
      success: false,
      message: `productPic expected as fieldname, you sent ${err.field}`,
    });
  }
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
