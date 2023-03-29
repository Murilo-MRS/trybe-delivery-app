const handleError = (err, _req, res, _next) => {
  if (err.type) {
    return res.status(err.type).json({ message: err.message });
  }
  res.status(500).json({ message: err.message }); 
};

module.exports = handleError;
