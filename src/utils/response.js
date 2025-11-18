export const success = (res, data, code = 200, mensage = "Success") => {
  return res.status(code).json({
    mensage,
    code,
    data,
  });
};
