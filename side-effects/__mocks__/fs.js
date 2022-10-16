import { vi } from "vitest";

/*
W każdym z plików *.test.js można zamockować konkretne obiekty lub funkcje. 
Poza zamianą funkcji na empty spy functions można napisać własną implementację mockowanych obiektów/funkcji.
Przy dużej ilości plików z testami staje się to ciężkie do zarządzania.
W folderze o nazwie "__mocks__" można umieścić wszystkie mocki. 
W plikach testowych używając metody vi.mock() zostaną one automatycznie wzięte pod uwagę.

Należy pamiętać, że folder musi się nazywać "__mocks__", a nazwy plików muszę odpowiadać modułom importowanym w testach.
Np. io.test.js użyto "import { promises as fs } from 'fs' ", więc ten plik musi się nazywać fs.js.
*/

export const promises = {
  writeFile: vi.fn((path, data) => {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }),
};
