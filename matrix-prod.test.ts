
class NMap<K, V>{
  mp: Map<K, Map<K, V>>;
  constructor() {
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

  get(i: K, j: K): V {
    return this.mp.get(i)!.get(j)!;
  }

  print() {
    for (let key of this.mp.keys()) {
      console.log(key, ": ", this.mp.get(key))
    }
  }
}

function matrixProd(p: number[]) {
  const n = p.length - 1;
  const m = new NMap<number, number>();
  const s = new NMap<number, number>();

  for (let i = 0; i < n; ++i)
    m.set(i, i, 0);

  let j;
  let q;
  for (let l = 2; l <= n; ++l) {
    for (let i = 0; i < n - l + 1; i++) {
      j = i + l - 1;
      m.set(i, j, 10e9);
      for (let k = i; k < j; ++k) {
        q = m.get(i, k) + m.get(k + 1, j) + p[i] * p[k + 1] * p[j + 1];
        if (q < m.get(i, j)) {
          m.set(i, j, q);
          s.set(i, j, k);
        }
      }
    }
  }
  return {
    m, s
  }
}

test("m1", () => {
  expect(matrixProd([30, 35, 15, 5, 10, 20, 25]).m.get(0, 5)).toBe(15125);
})
test("m2", () => {
  expect(matrixProd([10, 100, 5, 50]).m.get(0, 2)).toBe(7500);
})

