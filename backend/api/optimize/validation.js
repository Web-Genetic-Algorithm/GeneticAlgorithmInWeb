import { evaluate } from "mathjs";

export function validateApiRoutesParams(params) {
  const result = {
    rangeValidation: validateRange(params.range),
    stopTypeValidation: validateStopType(params.stopType),
    customFunctionValidation: validateCustomFunction(params.customFunction),
    taskTypeValidation: validateTaskType(params.taskType),
    validateGenerationsOrTime: validateGenerationsOrTime({
      stopType: params.stopType,
      generationsCount: params.generationsCount,
      timeOfWork: params.timeOfWork,
    }),
  };

  const errors = Object.values(result).filter(
    (validationResult) => validationResult !== true
  );

  if (errors.length > 0) {
    return errors;
  }

  return true;
}

function validateRange(arrayOfNums) {
  if (arrayOfNums.length != 2)
    return { error: "Range must consist of two numbers" };
  if (!arrayOfNums.every((num) => typeof num === "number"))
    return { error: "Range must contain only numbers" };
  if (arrayOfNums[0] > arrayOfNums[1])
    return {
      error: "The first number of the range must be less that the second",
    };
  return true;
}

function validateStopType(stopType) {
  if (typeof stopType !== "string") {
    return { error: "Stop type must be a string" };
  }

  if (stopType !== "time" && stopType !== "generations") {
    return { error: 'Stop type must be either "time" or "generations"' };
  }

  return true;
}

function validateGenerationsOrTime({ stopType, generationsCount, timeOfWork }) {
  const hasGen =
    typeof generationsCount === "number" && !isNaN(generationsCount);
  const hasTime = typeof timeOfWork === "number" && !isNaN(timeOfWork);

  if ((hasGen && hasTime) || (!hasGen && !hasTime)) {
    return {
      error:
        "Only one of 'generationsCount' or 'timeOfWork' must be a valid number",
    };
  }

  if (stopType === "generations" && !hasGen) {
    return {
      error: "generationsCount is required when stopType is 'generations'",
    };
  }
  if (stopType === "time" && !hasTime) {
    return { error: "timeOfWork is required when stopType is 'time'" };
  }

  return true;
}

function validateCustomFunction(customFunction, scope = { x: 1 }) {
  try {
    const result = evaluate(customFunction, scope);
    if (typeof result != "number" || !isFinite(result))
      return { error: "Function must return a finite number" };
    return true;
  } catch (error) {
    return { error: "Invalid function" };
  }
}

function validateTaskType(taskType) {
  if (taskType !== "min" && taskType !== "max")
    return { error: "Field must be either 'min' or 'max'" };
  return true;
}
