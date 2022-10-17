import { it, expect, vi, beforeEach } from "vitest";

import { Window } from "happy-dom";

import fs from "fs";
import path from "path";
import { showError } from "./dom";
/*
    Używając Vitest można wybrać środowisko, w którym testy zostaną uruchomione.
    Domyślnie jest to Node.js: 
    - dostępne są API i moduły Node.js.
    - nie ma możliwości interakcji z przeglądarką i API przeglądarki.

    Jeśli testujemy UI można wybrać jako środowisko JSDOM:
    - wirtualne środowisko DOM, symuluje zachowanie DOMu w przeglądarce.

    Innym środowiskiem do testowania DOMu jest Happy-DOM.
    
    Aby zmienić używane środowisko należy dodać do skryptu uruchamiającego testy flagę --environment z nazwą środowiska,
    np. "vitest --run --environment happy-dom".

    Aby skonfigurować środowisko pod testy DOMu należy dodać do virtualnego DOMu (dostarczonego przez JSDOM lub Happy-DOM)
    pliki HTML, na których są przeprowadzane operacje w plikach JS (w tym przypadku jeden plik - index.html). 
    Poniższy kod prezentuje jak skonfigurować Happy-DOM.
*/

const htmlDocPath = path.join(process.cwd(), "index.html");
const htmlDocumentContent = fs.readFileSync(htmlDocPath).toString();

const window = new Window();
const document = window.document;

vi.stubGlobal("document", document);

// Przed każdym testem należy zresetować virtual DOM ponieważ bez tego zmiany wprowadzone w jednym teście
// znajdują się w VDOM również w kolejnych testach.
beforeEach(() => {
  document.body.innerHTML = "";
  document.write(htmlDocumentContent);
});

it("should add an error paragraph to the id='errors' element", () => {
  showError("Test error");

  const errorsEl = document.getElementById("errors");
  const errorParagraph = errorsEl.firstElementChild;

  expect(errorParagraph).not.toBeNull();
});

it("should not contain an error paragraph initially", () => {
  const errorsEl = document.getElementById("errors");
  const errorParagraph = errorsEl.firstElementChild;

  expect(errorParagraph).toBeNull();
});

it("should ouput the provided message in the error paragraph", () => {
  const testErrorMessage = "test error";

  showError(testErrorMessage);

  const errorsEl = document.getElementById("errors");
  const errorParagraph = errorsEl.firstElementChild;

  expect(errorParagraph.textContent).toBe(testErrorMessage);
});

/*
    Testowanie DOMu może być uciążliwe przez selectowanie elementów, sprawdzanie ich klas czy zawartości.
    Pomocna może być biblioteka Testing Library, która ułatwia sprawdzanie elementów czy symulowanie eventów.
*/
