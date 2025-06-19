import { evaluate } from "mathjs";

export function validateApiRoutesParams(params) {
  const result = {
    rangeValidation: validateRange(params.range),
    stopTypeValidation: validateStopType(params.stopType),
    customFunctionValidation: validateCustomFunction(params.customFunction),
    taskTypeValidation: validateTaskType(params.taskType),
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
  if (arrayOfNums[0] < arrayOfNums[1])
    return {
      error: "The first number of the range must be less that the second",
    };
  return true;
}

function validateStopType(stopType) {
  /*TO DO: ADD NORMAL VALIDATION*/
  if (typeof stopType !== "string")
    return { error: "This field can only be a string" };
  return true;
}

function validateCustomFunction(customFunction, scope = { x: 1 }) {
  /*TO DO: ADD EXTRA VALIDATION*/
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
