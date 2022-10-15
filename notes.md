# JavaScript Unit Testing

## Co to jest testowanie

Weryfikacja czy system działa zgodnie z założeniami.

Testy dzielą się na:

- testy manualne
- testy automatyczne

## Rodzaje testów automatycznych

- Unit tests - testowanie małych, możliwie hermetycznych elementów systemu oddzielnie.
- Integration tests - testowanie połączenia elementów (_unitów_) systemu ze sobą.
- E2E tests - testowanie całego _flow_ konkretnej operacji, np. operacja wgrania pliku i wysłania do serwera.

## Unit tests

**Unit** - Część aplikacji, możliwie jak najmniejsza. Np. funkcja, klasa, komponent. System składa się z _unitów_. Jeśli wszistkie **unity** zostały pozytywnie przetestowane, to cały system również powinien prawidłowo działać.
Testy uruchamia się po wprowadzonych zmianach.

## Test-Driven Development (TDD)

Framework/ filozofia pisania testów. Polega na rozpoczęciu pracy nad projektem od pisania testów, a dopiero w następnej kolejności właściwego kodu aplikacji.

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
