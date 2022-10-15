import { it, describe, expect } from "vitest";
import { transformToNumber, cleanNumbers } from "./numbers";

describe("transformToNumber()", () => {
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
});

describe("cleanNumbers()", () => {
  it("should return an array of number values if an array of string number values is provided", () => {
    const numberValues = ["1", "2"];

    const cleanedNumbers = cleanNumbers(numberValues);

    // expect(cleanedNumbers[0]).toBeTypeOf("number");
    expect(cleanedNumbers).toEqual([1, 2]);
  });

  it("should throw an error if an array with at least one empty string is provided", () => {
    const numberValues = ["", 2];

    const cleanFn = () => cleanNumbers(numberValues);

    expect(cleanFn).toThrow();
  });
});
