import { it, expect, vi } from "vitest";
import { HttpError } from "./errors";
import { sendDataRequest } from "./http";

// Mockowanie globalnie dostępnych obiektów/funkcji, niewymagających importowania.
const testResponseData = { testKey: "testData" };
const testFetch = vi.fn((url, options) => {
  return new Promise((resolve, reject) => {
    if (typeof options.body !== "string") {
      return reject("Not a string.");
    }
    const testResponse = {
      ok: true,
      status: "testStatus",
      json() {
        return new Promise((resolve, reject) => {
          resolve(testResponseData);
        });
      },
    };
    resolve(testResponse);
  });
});

vi.stubGlobal("fetch", testFetch);

it("should return any available response data", () => {
  const testData = { key: "test" };

  return expect(sendDataRequest(testData)).resolves.toEqual(testResponseData);
});

it("should convert the provided data to JSON before sending the request", async () => {
  const testData = { key: "test" };

  let errorMessage;

  try {
    await sendDataRequest(testData);
  } catch (err) {
    errorMessage = err;
  }

  expect(errorMessage).not.toBe("Not a string.");
});

it("should throw an HttpError in case of non-ok responses", () => {
  testFetch.mockImplementationOnce((url, options) => {
    return new Promise((resolve, reject) => {
      const testResponse = {
        ok: false,
        status: "testStatus",
        json() {
          return new Promise((resolve, reject) => {
            resolve(testResponseData);
          });
        },
      };
      resolve(testResponse);
    });
  });

  const testData = { key: "test" };

  return expect(sendDataRequest(testData)).rejects.toBeInstanceOf(HttpError);
});
