const response = (statusCode, data, message, res) => {
  res.json(statusCode, [{
    payload: {
      data: data,
      message: message,
    },
    metadata: {
      prev: "",
      next: "",
      max: "",
    },
  }
]);
};

module.exports = response;
