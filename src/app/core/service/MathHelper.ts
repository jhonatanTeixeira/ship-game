export function toggleSign(value: number) {
  return Math.sign(value) > 0 ? -value : Math.abs(value);
}
