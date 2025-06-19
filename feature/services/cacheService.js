import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 600 });

function createCacheKey(params) {
  try {
    const keys = Object.keys(params).sort();
    const values = keys.map((key) => {
      const value = params[key];

      if (typeof value === "number" && isNaN(value)) return `${key}=NaN`;
      if (typeof value === "function" || typeof value === "symbol")
        return `${key}=[unsupported]`;
      if (typeof value === "undefined") return `${key}=undefined`;

      return `${key}=${JSON.stringify(value)}`;
    });

    return values.join("|");
  } catch (error) {
    console.error("Error during key creation", error);
    return null;
  }
}

function getFromCache(params) {
  const key = createCacheKey(params);
  if (!key) return;
  return cache.get(key);
}

function setToCache(params, value, duration) {
  const key = createCacheKey(params);
  if (!key) return;

  if (duration !== undefined) {
    cache.set(key, value, duration);
  } else {
    cache.set(key, value);
  }
}
