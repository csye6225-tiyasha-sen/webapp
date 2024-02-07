const routesAllowed = ["/healthz", "/v1/user", "/v1/user/self"];

export const checkRoutes = (req, res, next) => {
  if (!routesAllowed.includes(req.path)) {
    return res.status(404).end();
  }
  return next();
};
