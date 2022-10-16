# JavaScript Testing

<!-- 1. [Co to jest testowanie](#co-to-jest-testowanie)
2. [Rodzaje testów automatycznych](#rodzaje-testów-automatycznych)
3. [Testy jednostkowe](#testy-jednostkowe)
4. [Test-Driven Development](#test-driven-development-tdd)
5. [Narzędzia do testów automatycznych](#narzędzia-do-testów-automatycznych)
6. [Co powinno, a co nie powinno być testowane](#co-powinno-a-co-nie-powinno-być-testowane)
7. [Pisanie dobrych testów](#pisanie-dobrych-testów)
8. [Refaktoryzacja kodu pod testy](#refaktoryzacja-kodu-pod-testy)
9. [Testy integracyjne](#testy-integracyjne)
10. [Balans pomiędzy testami jednostkowymi a testami integracyjnymi](#balans-pomiędzy-testami-jednostkowymi-a-testami-integracyjnymi) -->

## Co to jest testowanie

Weryfikacja czy system działa zgodnie z założeniami.

Testy dzielą się na:

- testy manualne
- testy automatyczne

## Rodzaje testów automatycznych

- Unit tests - testowanie małych, możliwie hermetycznych elementów systemu oddzielnie.
- Integration tests - testowanie połączenia elementów (_unitów_) systemu ze sobą.
- E2E tests - testowanie całego _flow_ konkretnej operacji, np. operacja wgrania pliku i wysłania do serwera.

## Testy jednostkowe

**Unit** - Część aplikacji, możliwie jak najmniejsza. Np. funkcja, klasa, komponent. System składa się z _unitów_. Jeśli wszystkie _unity_ zostały pozytywnie przetestowane, to cały system również powinien prawidłowo działać.
Testy uruchamia się po wprowadzonych zmianach.

## Test-Driven Development (TDD)

Framework/ filozofia tworzenia aplikacji. Polega na rozpoczęciu pracy nad projektem od pisania testów według założeń biznesowych, a dopiero w następnej kolejności właściwego kodu aplikacji.

## Narzędzia do testów automatycznych

### Test Runner

- Uruchamia testy,
- automatycznie rozpoznaje pliki zawierające testy,
- wyświetla wyniki,
- np. Jest, Karma

### Assertion Library

- Używane do definiowania zpodziewanych wyników testów,
- sprawdza czy spodziewane wyniki zostały spełnione,
- np. Jest, Chai

## Co powinno, a co nie powinno być testowane

Testy powinny odnosić się tylko do kodu napisanego przez developera. Nie powinno się testować funkcji pochodzących z zewnętrznych bibliotek czy API przeglądarki lub środowiska uruchomieniowego.

Np. korzystając z fetch() API nie testuje się czy funkcja działa tak jak powinna. Rownież nie testuje się czy odpowiedź zwracana przez serwer jest poprawna. Co można przetestować w takim wypadku to odpowiednią reakcję na otrzymanie różnych responsów lub błędów.

## Pisanie dobrych testów

1. Zastosowanie się do zasady AAA - Arrange Act Assert.

np.

```js
it("should yield NaN if at least one invalid number is provided", () => {
  // Arrange
  const inputs = ["invalid", 1, 2];

  // Act
  const result = add(inputs);

  // Assert
  expect(result).toBeNaN();
});
```

2. Jeden test powinien testować jedną rzecz - konkretne zachowanie, możliwość.

3. Testy powinny być proste i skupione na sednie działania funkcji.

4. Ilość asercji w teście powinna być niska - najlepiej 1.

## Refaktoryzacja kodu pod testy

Jeśli istnieje funkcja, która wykonuje wiele różnych operacji napisanie do niej dobrych testów może być uciążliwe, trudne. W tym celu takie funkcje można podzielić na mniejsze. Dzięki temu pisanie testów będzie prostsze jak i sam kod będzie bardziej czytelny.

Np.:

```js
function formSubmitHandler(event) {
  event.preventDefault();
  const formData = new FormData(form);
  const numberInputs = extractNumbers(formData);

  let result = "";

  try {
    const numbers = [];
    for (const numberInput of numberInputs) {
      validateStringNotEmpty(numberInput);
      const number = transformToNumber(numberInput);
      validateNumber(number);
      numbers.push(number);
    }
    result = add(numbers).toString();
  } catch (error) {
    result = error.message;
  }

  let resultText = "";

  if (result === "invalid") {
    resultText = "Invalid input. You must enter valid numbers.";
  } else if (result !== "no-calc") {
    resultText = "Result: " + result;
  }

  output.textContent = resultText;
}
```

Kod po refaktoryzacji:

```js
function extractEnteredValues(form) {
  const formData = new FormData(form);
  const numberInputs = extractNumbers(formData);

  return numberInputs;
}

function calculateResult(numberValues) {
  let result = "";
  try {
    const numbers = cleanNumbers(numberValues);

    result = add(numbers).toString();
  } catch (error) {
    result = error.message;
  }

  return result;
}

function generateResultText(calculationResult) {
  let resultText = "";

  if (calculationResult === "invalid") {
    resultText = "Invalid input. You must enter valid numbers.";
  } else if (calculationResult !== "no-calc") {
    resultText = "Result: " + calculationResult;
  }

  return resultText;
}

export function outputResult(resultText) {
  const output = document.getElementById("result");

  output.textContent = resultText;
}

function formSubmitHandler(event) {
  event.preventDefault();

  const numberValues = extractEnteredValues(form);

  const result = calculateResult(numberValues);

  const resultText = generateResultText(result);

  outputResult(resultText);
}
```

## Testy integracyjne

Testy integracyjne to testy funkcji (_unitów_), które wywołują inne funkcje (_unity_).
Celem testów integracyjnych jest sprawdzenie czy poszczególne funkcje, z których każda działa prawidłowo, działają również prawidłowo wraz ze sobą.

Np.:

**Funkcja cleanNumbers()**

```js
export function cleanNumbers(numberInputs) {
  let numbers = [];

  for (const numberInput of numberInputs) {
    validateStringNotEmpty(numberInput);
    const number = transformToNumber(numberInput);
    validateNumber(number);
    numbers.push(number);
  }

  return numbers;
}
```

**Testy funkcji cleanNumbers()**

```js
describe("cleanNumbers()", () => {
  it("should return an array of number values if an array of string number values is provided", () => {
    const numberValues = ["1", "2"];

    const cleanedNumbers = cleanNumbers(numberValues);

    expect(cleanedNumbers[0]).toBeTypeOf("number");
  });

  it("should throw an error if an array with at least one empty string is provided", () => {
    const numberValues = ["", 2];

    const cleanFn = () => cleanNumbers(numberValues);

    expect(cleanFn).toThrow();
  });
});
```

## Balans pomiędzy testami jednostkowymi a testami integracyjnymi

Powinno się skupić przede wszystkim na testach jednostkowych, jednak nie należy rozbijać niepotrzebnie funkcji na jak najmniejsze tylko po to, by było możliwe napisanie do nich testów jednostkowych.

W przypadku funkcji, które wywołują inne funkcje, należy przygotować testy integracyjne.

W wyniku tego powstanie dużo testów jednostkowych i znacznie mniej testów integracyjnych.

## toBe() vs toEqual()

Poniższy test nie powiedzie się, nawet jeśli funkcja _cleanNumbers()_ działa w 100% prawidłowo.

```js
it("should return an array of number values if an array of string number values is provided", () => {
  const numberValues = ["1", "2"];

  const cleanedNumbers = cleanNumbers(numberValues);

  expect(cleanedNumbers).toBe([1, 2]);
});
```

Błąd zwrócony przez Vitest to:

```
AssertionError: expected [ 1, 2 ] to be [ 1, 2 ] // Object.is equality
```

Powodem jest fakt, że porównywane są nieprymitywne typy, a więc wskaźniki na ich miejsce w pamięci, a nie wartości jakie przechowują.

Aby poprawnie napisać taki test należy użyć funkcji _toEqual()_, która sprawdza same wartości.

```js
it("should return an array of number values if an array of string number values is provided", () => {
  const numberValues = ["1", "2"];

  const cleanedNumbers = cleanNumbers(numberValues);

  expect(cleanedNumbers).toEqual([1, 2]);
});
```

## Testowanie asynchronicznego kodu

### Callbacks

Funkcja _generateToken()_ wywołuje asynchroniczną funkcję _sign()_ z biblioteki _jsonwebtoken_, która jako ostatni parametr przyjmuje callback.

Poniższy test tej funkcji jest nieprawidłowy. Vitest nie czeka na zakończenie się asynchronicznych wywołań, dlatego funkcja _expect()_ nigdy nie zostanie wywołana. Prowadzi to do tego, że test zawsze się powiedzie, nawet w przypadkach kiedy nie powinien, ponieważ nie znajdzie żadnej asercji.

```js
it("should generate a token value", () => {
  const testUserEmail = "test@test.com";

  generateToken(testUserEmail, (err, token) => {
    expect(token).toBeDefined();
  });
});
```

Aby test był poprawny należy wywołać funkcję _done()_ na koniec asynchronicznych wywołań. Ponadto asercje należy objąć w blok _try..catch_ ponieważ powiadamiają one test o niepowodzeniu poprzez wyrzucenie błędu, a w przypadku asynchronicznych wywołań błąd ten nie zostanie automatycznie złapany.

```js
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
```

### Promises

W przypadku testowania funkcji asynchronicznych opartych o Promise są dwa sposoby:

1. Wywołanie testowanej funkcji w asercji - _expect()_ wspiera Promisy

```js
it("should generate a token value", () => {
  const testUserEmail = "test@test.com";

  return expect(generateTokenPromise(testUserEmail)).resolves.toBeDefined();

  // w przypadku oczekiwania niepowodzenia Promisa.
  //   expect(generateTokenPromise(testUserEmail)).rejects.toThrow();
});
```

2. Użycie async/await

```js
it("should generate a token value", async () => {
  const testUserEmail = "test@test.com";

  const token = await generateTokenPromise(testUserEmail);

  expect(token).toBeDefined();
});
```

## Użycie Setup & Cleanup Hooks

Pisząc wiele testów dla jednego _unitu_ może się przydażyć, że w każdym z nich inicuje się takie same wartości.

Np.:

**Klasa User**

```js
export class User {
  constructor(email) {
    this.email = email;
  }

  updateEmail(newEmail) {
    this.email = newEmail;
  }

  clearEmail() {
    this.email = "";
  }
}
```

**Testy klasy User**

W każdym z testów tworzony jest taki sam obiekt klasy User, z takim samym argumentem przekazanym do konstruktora.

```js
it("should update the email", () => {
  const testEmail = "test@test.com";
  const newTestEmail = "test2@test.com";

  const user = new User(testEmail);
  user.updateEmail(newTestEmail);

  expect(user.email).toBe(newTestEmail);
});

it("should have an email property", () => {
  const testEmail = "test@test.com";

  const user = new User(testEmail);

  expect(user).toHaveProperty("email");
});

it("should store the provided email value", () => {
  const testEmail = "test@test.com";

  const user = new User(testEmail);

  expect(user.email).toBe(testEmail);
});
```

Aby skrócic kod i nie kopiować tych samych wywołań można użyć _hooków_.

Dostępne w Vitest _hooki_:

- beforeAll
- beforeEach
- afterEach
- afterAll

**Przykład użycia beforeEach**

```js
let testEmail;
let user;

beforeEach(() => {
  testEmail = "test@test.com";
  user = new User(testEmail);
});

it("should update the email", () => {
  const newTestEmail = "test2@test.com";

  user.updateEmail(newTestEmail);

  expect(user.email).toBe(newTestEmail);
});

it("should have an email property", () => {
  expect(user).toHaveProperty("email");
});

it("should store the provided email value", () => {
  expect(user.email).toBe(testEmail);
});
```

## Zrównoleglenie testów

```js
it.concurrent("should update the email", () => {
  const newTestEmail = "test2@test.com";

  user.updateEmail(newTestEmail);

  expect(user.email).toBe(newTestEmail);
});

it.concurrent("should have an email property", () => {
  expect(user).toHaveProperty("email");
});

it.concurrent("should store the provided email value", () => {
  expect(user.email).toBe(testEmail);
});
```

lub

```js
describe.concurrent("User", () => {
  it("should update the email", () => {
    const newTestEmail = "test2@test.com";

    user.updateEmail(newTestEmail);

    expect(user.email).toBe(newTestEmail);
  });

  it("should have an email property", () => {
    expect(user).toHaveProperty("email");
  });

  it("should store the provided email value", () => {
    expect(user.email).toBe(testEmail);
  });
});
```

## Spies & Mocks - radzenie sobie z impure functions

Pojęcia te odnoszą się do radzenia sobie z efektami ubocznymi (ang. _side effects_) funkcji.

**Spies** - wrappery funkcji lub puste zamienniki funkcji, które pozwalają na śledzenie czy funkcja została wywołana i z jakimi argumentami.

**Mocks** - zamiennik dla różnego rodzaju API, który może dostarczyć zachowania wymaganego do testów, zamiast używać prawdziwego API.

### Spies

**Funkcja generateReportData()**

Jako argument przyjmuje ona funkcję, która ma posłużyć do wypisania tekstu na konsolę.

```js
export function generateReportData(logFn) {
  const data = "Some dummy data for this demo app";
  if (logFn) {
    logFn(data);
  }

  return data;
}
```

**Test funkcji generateReportData()**

Zamiast przekazywać prawdziwą funkcję, która rzeczywiście wypisze dane na konsolę, utworzono funkcję śledząca funkcję za pomocą `vi.fn()`. Jest to funkcja, która nie robi nic poza śledzeniem czy została wywołana oraz z jakimi argumentami.

```js
describe("generateReportData()", () => {
  it("should execute logFn if provided", () => {
    const logger = vi.fn();

    generateReportData(logger);

    expect(logger).toBeCalled();
  });
});
```

### Mocks

**Funkcja writeData()**

Funkcja tworzy plik w folderze na dysku i zapisuje do niego dane.

```js
import path from "path";
import { promises as fs } from "fs";

export default function writeData(data, filename) {
  const storagePath = path.join(process.cwd(), "data", filename);
  return fs.writeFile(storagePath, data);
}
```

**Test funkcji writeData()**

Test ten w poprawny sposób sprawdza poprawność funkcji jednak w wyniku jej side effectu przy każdym wywołaniu testu dane do pliku na dysku rzeczywiście są zapisywane. Innymi side effectami mogłaby być edycja danych w bazie danych lub wysyłanie requestów do API.

```js
it("should execute the writeFile method", () => {
  const testData = "test";
  const testFileName = "test.txt";

  writeData(testData, testFileName);

  return expect(writeData(testData, testFileName)).resolves.toBeUndefined();
});
```

Aby poprawnie przetestować funkcję i jednocześnie zapobiec efektom ubocznym można zamokować obiekt `fs`. Po wywołaniu `vi.mock("fs")` w trakcie wykonywania testów funkcje obiektu `fs` zostaną zamienione na _empty spy functions_. Wtedy można zaimportować rzeczywisty obiekt tak samo jak w kodzie funkcji i bez konsekwencji czy została na nim wywołana konkretna funkcja.

```js
import { it, expect, vi } from "vitest";
import writeData from "./io";
import { promises as fs } from "fs";

vi.mock("fs");

it("should execute the writeFile method", () => {
  const testData = "test";
  const testFileName = "test.txt";

  writeData(testData, testFileName);

  expect(fs.writeFile).toBeCalled();
});
```

Często zastąpienie funkcji z 3rd party libraries za pomocą _empty spy functions_ jest niewystarczające dla procesu pisania testów. Np. aby sprawdzić, czy funkcję `fs.writeFile()` wywołało się z odpowiednimi argumentami należy zamockować jej działanie własną funkcją.

`fs` jest aliasem importowanego obiektu `promises`. Funkcja `writeFile()` przyjmuje jako parametry ścieżkę do pliku oraz dane i zwraca Promise. Na podstawie tych informacji można zamockować bibliotekę w poniższy sposób:

```js
import { vi } from "vitest";

export const promises = {
  writeFile: vi.fn((path, data) => {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }),
};
```

Wtedy można napisać test jak poniżej, który dostarczy potrzebnych do testu funkcjonalności metody `writeFile()` ale nie dokona zapisu pliku na dysku.

```js
it("should execute the writeFile method", () => {
  const testData = "test";
  const testFileName = "test.txt";

  writeData(testData, testFileName);

  expect(fs.writeFile).toBeCalledWith(testFileName, testData);
});
```

### \_\_mocks\_\_

Jeśli często używa się takich samych mocków danych funkcji z bibliotek zewnętrznych nie trzeba wklejać ich do każdego pliku z testami. W roocie projektu można utworzyć folder o nazwie \_\_mocks\_\_, a w nim mocki konkretnych funkcji. Np. jeśli chcemy zamockować obiekt fs importowany w taki sposób: `import { promises as fs } from "fs";`, to w katalogu \_\_mocks\_\_ należy utworzyć plik `fs.js`. Podczas przeprowadzania testów Vitest sprawdza katalog \_\_mocks\_\_ i automatycznie mockuje funkcje. W poniżej przedstawionym teście znajduje się import oryginalnego obiektu promises (`import { promises as fs } from "fs";`) ale metoda wykonana na nim pochodzi z pliku `fs.js`.

Plik /\_\_mocks\_\_/fs.js:

```js
import { vi } from "vitest";

export const promises = {
  writeFile: vi.fn((path, data) => {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }),
};
```

Plik io.test.js:

```js
import { it, expect, vi } from "vitest";
import writeData from "./io";
import { promises as fs } from "fs";

it("should execute the writeFile method", () => {
  const testData = "test";
  const testFileName = "test.txt";

  writeData(testData, testFileName);

  expect(fs.writeFile).toBeCalledWith(testFileName, testData);
});
```

### Mockowanie globalnie dostępnych obiektów

W trakcie pisania testu może wystąpić potrzeba zamockowania nie tylko obiektów pochodzących z importowanych zewnętrznych bibliotek, ale też obiektów dostępnych globalnie. Mogą to być np.: funkcja fetch(), obiekt navigator. Do mockowania takich obiektów służy metoda `vi.stubGlobal()`.

Plik http.js:

```js
export async function sendDataRequest(data) {
  const response = await fetch("https://dummy-site.dev/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw new HttpError(
      response.status,
      "Sending the request failed.",
      responseData
    );
  }

  return responseData;
}
```

Plik http.test.js:

```js
import { it, expect, vi } from "vitest";
import { HttpError } from "./errors";
import { sendDataRequest } from "./http";

// fetch() mock
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
```

Jeśli w jednym konkretnym teście chcemy użyć nieco inaczej wyglądającego mocka funkcji `fetch()` można to osiągnąć za pomocą metody `mockImplementationOnce()`:

```js
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
```
