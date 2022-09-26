export interface Node {
  next: Map<string, Node>;
  isTrailing: boolean;
}

class Bor {
  root: Node;
  constructor() {
    this.root = {
      c: '',
      next: new Map(),
      isTrailing: false,
    } as Node;
  }

  add(s: string) {
    let node: Node = this.root;
    let next: Node;
    for (let c of s) {
      if (!node.next.has(c)) {
        next = {
          next: new Map(),
          isTrailing: false,
        }
        node.next.set(c, next);
      }

      node = node.next.get(c)!;
    }

    node.isTrailing = true;
  }

  has(s: string): boolean {
    function hasHelper(s: string, i: number, node: Node): boolean {
      if (!node.next.has(s[i]))
        return false;

      if (node.isTrailing)
        return true;

      return hasHelper(s, i + 1, node.next.get(s[i])!);
    }

    return hasHelper(s, 0, this.root);
  }

  findByPrefix(s: string): string[] {
    let i = 0;
    let node = this.root;

    while (node && node.next.has(s[i])) {
      node = node.next.get(s[i])!;
      ++i;
    }

    if (i < s.length)
      return [];

    // DRY
    function findHelper(node: Node, s: string[], r: string[]): void {
      if (node.isTrailing)
        r.push(s.join(""));
      for (let [key, value] of node.next.entries())
        findHelper(value, [...s, key], r);
    }

    const r: string[] = [];
    findHelper(node, [s], r)
    return r;
  }

  // DRY
  print() {
    function printHelper(node: Node, s: string[], r: string[]) {
      if (node.isTrailing)
        r.push(s.join(""));
      for (let [key, value] of node.next.entries())
        printHelper(value, [...s, key], r);
    }

    const r: string[] = [];
    printHelper(this.root, [], r);
    console.log(r);
    return r;
  }
}




const bor = new Bor();
const t = ["he", "she", "his", "hers", "tigeet"];
t.forEach(w => bor.add(w));

describe("(add, print)", () => {
  test("add, print#1", () => expect(bor.print()).toEqual(["he", "hers", "his", "she", "tigeet"]))
})

describe("(has)", () => {
  test("has#1", () =>
    expect(bor.has("fjpwo")).toBe(false)
  ),
    test("has#2", () =>
      expect(bor.has("hers")).toBe(true)
    )
})

describe("(find)", () => {
  test("find#1", () => expect(bor.findByPrefix("h")).toEqual(["he", "hers", "his"])),
    test("find#2", () => expect(bor.findByPrefix("he")).toEqual(["he", "hers"]))
})
