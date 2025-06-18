const NodeCache = require("node-cache");

const cache = new NodeCache();

module.exports = duration => (req, res, next) => {
    /*
function createMiddleware(duration) {
  return function(req, res, next) {
    // Middleware-логика
  };
}

module.exports = createMiddleware;
*/
    if(req.method !== "GET") {
        console.error("Cannot cache non-GET methods");
        return next();
    //if the request isn't GET we will call next() and skip the rest of the midlleware
    }
    const key = req.body.customFunction;
    const cacheResponse = cache.get(key);

    if(cachedResponse){
        res.sent(cachedResponse);
    }
};
