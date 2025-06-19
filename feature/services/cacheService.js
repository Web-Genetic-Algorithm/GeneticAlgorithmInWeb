import NodeCache from "node-cache";

export const cache = new NodeCache({ stdTTL: 600 });

export function createCacheKey(params) {
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

export function findCashedJobByFunctionName(customFunction) {
  const keys = cache.keys();

  for (const key of keys) {
    const parts = key.split("|");
    const foundCustomFuncKey = parts.find(
      (part) =>
        part.startsWith("customFunction=") &&
        part === `customFunction=${JSON.stringify(customFunction)}`
    );

    if (foundCustomFuncKey) {
      return cache.get(key);
    }
  }
  return null;
}

export function setPendingJobToCache(key, jobId) {
  cache.set(key, {
    jobId,
    status: "pending",
    result: null,
  });
}

export function setDoneJobToCache(key, jobId, result) {
  cache.set(key, {
    jobId,
    status: "done",
    result,
  });
}
export function getTaskByJobId(jobId) {
  const keys = cache.keys();
  for (const key of keys) {
    const task = cache.get(key);
    if (task?.jobId === jobId) {
      return task;
    }
  }
  return null;
}
