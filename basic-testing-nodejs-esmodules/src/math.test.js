import { it, expect } from "vitest";
import { add } from "./math";

it("should summarize all number values in an array", () => {
  // Arrange
  const numbers = [9, 3, 1];

  // Act
  const result = add(numbers);

  // Assert
  const expectedResult = numbers.reduce(
    (prevVal, curVal) => prevVal + curVal,
    0
  );
  expect(result).toBe(expectedResult);
});

it("should yield NaN if at least one invalid number is provided", () => {
  // Arrange
  const inputs = ["invalid", 1, 2];

  // Act
  const result = add(inputs);

  // Assert
  expect(result).toBeNaN();
});

it("should yield a correct sum if an array of numeric string values is provided", () => {
  // Arrange
  const numbers = ["1", "2", "3"];

  // Act
  const result = add(numbers);

  // Assert
  const expectedResult = numbers.reduce(
    (prevVal, curVal) => +prevVal + +curVal,
    0
  );
  expect(result).toBe(expectedResult);
});

it("should yield 0 if an empty array is provided", () => {
  // Arrange
  const numbers = [];

  // Act
  const result = add(numbers);

  // Assert
  const expectedResult = 0;
  expect(result).toBe(expectedResult);
});

it("should throw an error if no value is passed into the function", () => {
  const resultFn = () => {
    add();
  };

  // expect(resultFn).not.toThrow();
  expect(resultFn).toThrow();
});

it("should throw an error if provided with multiple arguments instead of an array", () => {
  // Arrange
  const number1 = 1;
  const number2 = 2;

  // Act
  const resultFn = () => {
    add(number1, number2);
  };

  // Assert
  //
  // Do metody toThrow() można przekazać RegExp lub string aby sprawdzić czy wyrzucony błąd zawiera określoną wiadomość/
  // Można też przekazać konkretną instację błędu - klasy Error.
  expect(resultFn).toThrow(/is not iterable/);
});
