export function assertIsNonEmptyString(value?: string | null): asserts value is string {
  if (!value) {
    throw new Error(`Provided string: "${value}" is not defined or empty!`);
  }
}
