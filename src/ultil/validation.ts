import { OPTION_TYPE, PERCENT } from "./types";

export const validateInput = (value: string, option?: OPTION_TYPE) => {
  //remover all alpha and special characters except minus
  value = value.replace(/[^\d.-]/g, "");
  //More than one decimal point then remove the last point
  if ((value.match(/\./g) || []).length > 1) {
    value = value.substring(0, value.lastIndexOf("."));
  }

  // If the value is empty or not a number, set it to 0
  if (value === "" || isNaN(Number(value))) {
    value = "0";
  }

  if (option === PERCENT && Number(value) > 100) {
    return;
  }

  if (Number(value) < 0) {
    return "0";
  }

  return Number(value).toString();
};

export const convertCommaToPoint = (value: string) => {
  return value.replace(",", ".");
};
