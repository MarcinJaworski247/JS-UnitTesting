import { describe, it, expect, vi } from "vitest";
import { generateReportData } from "./data";

// Użycie spy
describe("generateReportData()", () => {
  it("should execute logFn if provided", () => {
    const logger = vi.fn();

    // generateReportData() przyjmuje jako argument funkcję, która ma posłużyć do wypisania tekstu na konsolę.
    // Zamiast przekazać prawdziwą funkcję w teście to przy pomocy vi.fn() utworzono funkcję,
    // która nie robi nic poza śledzeniem czy została wywołana.
    // Można też śledzić jakie argumenty zostały do niej przekazane.
    // Jest to dobry sposób na testowanie funkcji z efektami ubocznymi.
    // Zamiast rzeczywiście zapisywać dane w pliku lub łączyć się z bazą danych można użyć takiej "atrapy" funkcji
    // i jedynie sprawdzić czy została wywołana i z jakimi argumentami.
    generateReportData(logger);

    expect(logger).toBeCalled();
  });
});
