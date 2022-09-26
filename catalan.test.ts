function C(n: number): number {
  if (n === 0)
    return 1;

  let s = 0;
  for (let i = 0; i < n; ++i) {
    s += C(i) * C(n - i - 1);
  }
  return s;
}

function MemoC(n: number): number {
  function MemoCHelper(n: number, c: number[]): number {
    if (c[n] > 0)
      return c[n];

    for (let i = 0; i < n; ++i) {
      c[n] += MemoCHelper(i, c) * MemoCHelper(n - i - 1, c);
    }
    return c[n];
  }

  const c = Array(n + 1).fill(0);
  c[0] = 1;
  return MemoCHelper(n, c);
}

// Tests
test("Plain recursive #1", () => {
  expect(C(20)).toBe(6564120420);
})

test("Memo recursive #1", () => {
  expect(MemoC(20)).toBe(6564120420);
})
