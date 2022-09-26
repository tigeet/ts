function zFunc(s: string): number[] {
  const n = s.length
  const z = Array(n).fill(0)
  let l = 0
  let r = 0
  for (let i = 1; i < n; ++i) {
    if (i <= r) {
      z[i] = Math.min(r - i + 1, z[i - l])
    }

    while (i + z[i] < n && s[z[i]] === s[i + z[i]]) {
      z[i]++
    }

    if (i + z[i] - 1 > r) {
      l = i
      r = i + z[i] - 1
    }
  }
  return z
}

function includes(s: string, p: string): boolean {
  const z = zFunc(p + "#" + s)
  return Math.max(...z) === p.length
}

describe("(zFunc): zFunction tests", () => {
  test("zFunc#1", () =>
    expect(zFunc("aaaaa")).toEqual([0, 4, 3, 2, 1])
  )
  test("zFunc#2", () =>
    expect(zFunc("aaabaab")).toEqual([0, 2, 1, 0, 2, 1, 0])
  )
  test("zFunc#3", () =>
    expect(zFunc("abacaba")).toEqual([0, 0, 1, 0, 3, 0, 1])
  )
})




describe("(includes): Substring search test", () => {
  test("includes#1", () =>
    expect(includes("aaaaaaaaaaaaaa", "aaaa")).toBe(true)
  )

  test("includes#2", () =>
    expect(includes("abcabcabc", "ababab")).toBe(false)
  )
  test("includes#3", () =>
    expect(includes("fngewgnewiewufnwpefnie", "newiew")).toBe(true)
  )
})
