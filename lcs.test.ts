class NDMap<K, V, R> {
  mp: Map<K, Map<K, V>>;
  defaultValue: R;
  constructor(defaultValue: R) {
    this.defaultValue = defaultValue;
    this.mp = new Map<K, Map<K, V>>();

    this.get.bind(this);
    this.set.bind(this);
    this.print.bind(this);
  }

  set(i: K, j: K, v: V) {
    if (!this.mp.has(i))
      this.mp.set(i, new Map<K, V>());
    this.mp.get(i)!.set(j, v);
  }

  get(i: K, j: K): R | V {
    if (!this.mp.has(i))
      return this.defaultValue;

    if (!this.mp.get(i)!.has(j))
      return this.defaultValue;

    return this.mp.get(i)!.get(j)!;

  }
  print() {
    for (let key of this.mp.keys()) {
      console.log(key, ": ", this.mp.get(key))
    }
  }
}

function lcs(x: string, y: string): { c: NDMap<number, number, number>, s: number } {
  const m = x.length;
  const n = y.length
  const c: NDMap<number, number, number> = new NDMap(0);
  for (let i = 0; i < m; ++i) {
    for (let j = 0; j < n; ++j) {
      if (x[i] === y[j]) {
        c.set(i, j, c.get(i - 1, j - 1) + 1)
      } else if (c.get(i - 1, j) >= c.get(i, j - 1)) {
        c.set(i, j, c.get(i - 1, j))
      } else {
        c.set(i, j, c.get(i, j - 1))
      }
    }
  }
  c.print()
  return { c, s: c.get(m - 1, n - 1) };
}

function build(x: string, y: string, c: NDMap<number, number, number>): string {
  let px = x.length - 1;
  let py = y.length - 1;
  const lcs: string[] = [];
  while (px !== 0 && py !== 0) {
    if (c.get(px, py) === 1 + c.get(px - 1, py - 1)) {
      lcs.push(x[px]);
      --px;
      --py;
    }
    else
      if (c.get(px, py) === c.get(px - 1, py))
        --px;

      else if (c.get(px, py) === c.get(px, py - 1))
        --py;
  }

  if (px === 0 && py === 0) {
    lcs.push(x[px])
  }
  return lcs.reverse().join('');
}
const { c } = lcs("ABCBDAB", "BDCABA")
console.log(build("ABCBDAB", "BDCABA", c))
// test("$1", () => expect(lcs("ABCBDAB", "BDCABA").s).toBe(4))
