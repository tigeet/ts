function cutRodHelper(p: readonly number[], n: number, r: number[]): number {
  if (n === 0)
    return 0;

  if (r[n] > 0)
    return r[n];

  let q = -1;
  for (let i = 1; i < n; ++i) {
    q = Math.max(q, p[i] + cutRodHelper(p, n - i - 1, r));
  }
  r[n] = q;
  return q;
}

function cutRodTopDown(p: number[]): number {
  const n = p.length + 1;
  const r = Array(n).fill(0);

  return cutRodHelper(p, n - 1, r);
}



function cutRodDownTop(p: number[]): number {
  const n = p.length + 1;
  const r = Array(n).fill(-1);
  r[0] = 0;
  for (let i = 1; i < n; ++i) {
    let q = -1;
    for (let j = 0; j < i; ++j) {
      q = Math.max(q, p[j] + r[i - j - 1]);
    }
    r[i] = q;
  }

  return r[n - 1];
}


test("Top-Down#1", () => {
  expect(cutRodTopDown([1, 5, 8, 9])).toBe(10);
})

test("Down-Top#1", () => {
  expect(cutRodDownTop([1, 5, 8, 9])).toBe(10);
})
