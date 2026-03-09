import type { Column } from "@tanstack/react-table";

import type { ExtendedColumnSort } from "@/types/data-table";
import type { StockData } from "@/types/stock-data";

import { getSortingStateParser, getCommonPinningStyles } from "../data-table";

describe("data-table helpers", () => {
  describe("getSortingStateParser", () => {
    const parser = getSortingStateParser<StockData>(["symbolCode", "name"]);

    it("should correctly identify equal sorting states", () => {
      // Use the StockData interface here
      const stateA: ExtendedColumnSort<StockData>[] = [{ id: "symbolCode", desc: true }];
      const stateB: ExtendedColumnSort<StockData>[] = [{ id: "symbolCode", desc: true }];

      expect(parser.eq(stateA, stateB)).toBe(true);
    });

    it("should serialize sorting state to JSON string", () => {
      const state: ExtendedColumnSort<StockData>[] = [{ id: "name", desc: false }];
      expect(parser.serialize(state)).toBe(JSON.stringify(state));
    });
  });

  describe("getCommonPinningStyles", () => {
    // Mocking TanStack Column interface
    const createMockColumn = (pin: "left" | "right" | false, isLast = false) =>
      ({
        getIsPinned: () => pin,
        getIsLastColumn: (side: string) => pin === side && isLast,
        getIsFirstColumn: (side: string) => pin === side && isLast,
        getStart: () => 0,
        getAfter: () => 0,
        getSize: () => 150,
      }) as unknown as Column<any>;

    it("should return sticky position styles for pinned columns", () => {
      const column = createMockColumn("left");
      const styles = getCommonPinningStyles({ column });

      expect(styles.position).toBe("sticky");
      expect(styles.zIndex).toBe(1);
    });

    it("should apply box-shadow when withBorder is true and column is last pinned left", () => {
      const column = createMockColumn("left", true);
      const styles = getCommonPinningStyles({ column, withBorder: true });

      expect(styles.boxShadow).toBe("-4px 0 4px -4px var(--border) inset");
    });
  });
});
