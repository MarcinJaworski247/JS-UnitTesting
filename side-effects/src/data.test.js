import { describe, it, expect, vi } from "vitest";
import { generateReportData } from "./data";

// Użycie spy
describe("generateReportData()", () => {
  it("should execute logFn if provided", () => {
    // utworzenie empty spy function
    const logger = vi.fn();

    // można też utworzyć spy function z określonym zachowaniem
    // const logger = vi.fn(() => {
    // });

    // Zamockowanie funkcji w konkretny sposób tylko w konkretnym teście.
    // Mocki z __mocks__ zostają nadpisane.
    // Po jednym wykonaniu funkcji, wróci ona do bycia empty spy function.
    // Można też użyć mockImplementation().
    logger.mockImplementationOnce(() => {});

    // generateReportData() przyjmuje jako argument funkcję, która ma posłużyć do wypisania tekstu na konsolę.
    // Zamiast przekazać prawdziwą funkcję w teście to przy pomocy vi.fn() utworzono funkcję,
    // która nie robi nic poza śledzeniem czy została wywołana.
    // Można też śledzić jakie argumenty zostały do niej przekazane.
    // Jest to dobry sposób na testowanie funkcji z efektami ubocznymi.
    // Zamiast rzeczywiście zapisywać dane w pliku lub łączyć się z bazą danych można użyć takiej "atrapy" funkcji
    // i jedynie sprawdzić czy została wywołana i z jakimi argumentami.
    generateReportData(logger);

    expect(logger).toBeCalled();

    // sprawdzenie czy funkcja została wywołana dwukrotnie
    // expect(logger).toBeCalledTimes(2);

    // sprawdzenie czy funkcja została wywołana z podanymi argumentami
    // expect(logger).toBeCalledWith("argument");
  });
});
