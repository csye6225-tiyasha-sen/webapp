//const routesAllowed = ["/healthz", "/v1/user", "/v1/user/self"];

const routesAllowed = {
  "/healthz": ["GET"],
  "/v1/user": ["POST"],
  "/v1/user/self": ["PUT", "GET"],
};
// export const checkRoutes = (req, res, next) => {
//   const allowedMethods = routesAllowed[req.path];
//   if (!allowedMethods) {
//     return res.status(404).end();
//   }
//   return next();
// };

// if (!routesAllowed(req.path).includes(req.method)) {
//   return res.status(404).end();
// }
// return next();

export const checkReqMethods = (req, res, next) => {
  //console.log(`${req.method}`);
  if (req.method === "GET") {
    next();
  } else {
    return res.status(405).send();
  }
};

export const checkReqMethodsForUser = (req, res, next) => {
  //console.log(`${req.method}`);
  const allowedMethods = routesAllowed[req.path];
  console.log(`Request path: ${req.path}`);

  if (!allowedMethods) {
    console.log(`Request method: ${req.method}`);
    return res.status(404).send();
  }

  if (!allowedMethods.includes(req.method)) {
    return res.status(405).send();
  }

  return next();
};
