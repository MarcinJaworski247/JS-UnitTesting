import { it, expect, vi } from "vitest";
import writeData from "./io";
import { promises as fs } from "fs";
// import path from "path";

// Poniżej nastąpi operacja automockowania i podczas wykonywania testów funkcje modułu o nazwie "fs"
// zostaną podmienione na empty spy functions. Dzięki temu testy funkcji writeData(), w której wywołane jest fs.writeFile(),
// nie spowodują rzeczywistego zapisu danych w pliku na dysku.
vi.mock("fs");

// Zamiast zamieniać wszystkie funkcje modułu path na empty spy functions
// można przekazać funkcję, która zwróci cały obiekt imitujący dany moduł, w tym
// przypadku path.
vi.mock("path", () => {
  return {
    default: {
      join(...args) {
        return args[args.length - 1];
      },
    },
  };
});

// Co jest nie tak z poniższym testem?
// Funkcja writeData() nie jest czysta - posiada side effect w postaci utworzenia pliku i zapisu danych do niego.
// Przy każdym wykonaniu poniższego testu plik rzeczywiście jest tworzony chociaż to tylko test.
it("should execute the writeFile method", () => {
  const testData = "test";
  const testFileName = "test.txt";

  writeData(testData, testFileName);

  // return expect(writeData(testData, testFileName)).resolves.toBeUndefined();
  // expect(fs.writeFile).toBeCalled();
  expect(fs.writeFile).toBeCalledWith(testFileName, testData);
});

/*
Spies - wrappers around functions or empty replacements for functions that allow you
track if & how a function was called.

Mocks - a replacement for an API that may provide some test-specific behavior instead.
*/

it("should return a promise that resolves to no value if called correctly", () => {
  const testData = "test";
  const testFileName = "test.txt";

  writeData(testData, testFileName);

  return expect(writeData(testData, testFileName)).resolves.toBeUndefined();
});
