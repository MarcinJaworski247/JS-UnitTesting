import { it, expect } from "vitest";
import { transformToNumber } from "./numbers";

it("should return a number value of passed string", () => {
  const number = "1";

  const result = transformToNumber(number);

  expect(result).toBe(+number);
  // expect(result).toBeTypeOf("number");
});

it("should return NaN if no number is passed", () => {
  const result = transformToNumber();

  expect(result).toBeNaN();
});

it("should return NaN if invalid character is passed", () => {
  const number = "one";
  const numbe2 = {};

  const result = transformToNumber(number);
  const result2 = transformToNumber(numbe2);

  expect(result).toBeNaN();
  expect(result2).toBeNaN();
});
