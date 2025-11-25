export const success = (res, payload, code = 200, mensage = "Success") => {
  const response = {
    mensage,
    code,
  };

  if (payload && payload.data && payload.total !== undefined) {
    response.data = payload.data;
    response.total = payload.total;
    response.totalPages = payload.totalPages;
    response.page = payload.page;
    response.limit = payload.limit;
  } else {
    response.data = payload;
  }

  return res.status(code).json(response);
};