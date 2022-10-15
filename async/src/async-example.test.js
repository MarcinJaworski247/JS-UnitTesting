import { it, expect } from "vitest";
import { generateToken, generateTokenPromise } from "./async-example";

// CALLBACKS
//
// ŹLE!!! test zawsze zwróci true 🤷‍♂️
// Vitest nie czeka na asyncroniczne wywołania, a więc linijka, w której znajduje się wywołanie expect() nigdy się nie wywoła.
// Dlatego tak napisany kod do asynchronicznej funkcji zawsze się powiedzie.
//
// it("should generate a token value", () => {
//   const testUserEmail = "test@test.com";

//   generateToken(testUserEmail, (err, token) => {
//     expect(token).toBeDefined();
//   });
// });

it("should generate a token value", (done) => {
  const testUserEmail = "test@test.com";

  generateToken(testUserEmail, (err, token) => {
    try {
      expect(token).toBeDefined();
      done();
    } catch (err) {
      done(err);
    }
  });
});

// PROMISES
// sposób 1.

it("should generate a token value", () => {
  const testUserEmail = "test@test.com";

  // expect() supports Promises out of the box/
  return expect(generateTokenPromise(testUserEmail)).resolves.toBeDefined();

  // w przypadku oczekiwania niepowodzenia Promisa.
  //   expect(generateTokenPromise(testUserEmail)).rejects.toThrow();
});

// sposób 2.
it("should generate a token value", async () => {
  const testUserEmail = "test@test.com";

  const token = await generateTokenPromise(testUserEmail);

  expect(token).toBeDefined();
});
