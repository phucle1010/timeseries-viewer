/**
 * Mock for nuqs (ESM-only) so Jest can run tests that import data-table.
 * createParser returns a builder with parse/serialize/eq and chain methods.
 */
export const createParser = <T>(config: {
  parse: (value: string) => T | null;
  serialize: (value: T) => string;
  eq?: (a: T, b: T) => boolean;
}) => ({
  ...config,
  withOptions: () => ({
    withDefault: () => config,
  }),
  withDefault: () => config,
});
