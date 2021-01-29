const helloJsonReponse = { msg: "Hello World!" };

exports.rootRoute = {
  method: "GET",
  path: "/",
  handler: (request, h) => {
    return h.response(helloJsonReponse);
  },
};
