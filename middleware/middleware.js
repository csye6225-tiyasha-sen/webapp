const routesAllowed = ["/healthz", "/v1/user", "/v1/user/self"];

export const checkRoutes = (req, res, next) => {
  if (!routesAllowed.includes(req.path)) {
    return res.status(404).end();
  }
  return next();
};

export const checkReqMethods = (req, res, next) => {
  //console.log(`${req.method}`);
  if (req.method === "GET") {
    next();
  } else {
    return res.status(405).send();
  }
};
