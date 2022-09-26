export interface Node {
  p: Node | null;
  left: Node | null;
  right: Node | null;
  key: number;
}

function validateSubTree(root: Node | null, lower: number, upper: number): boolean {
  if (!root)
    return true;

  if (root.left && (root.left.key < lower) || (root.left!.key > root.key))
    return false;

  if (root.right && (root.right.key < root.key || root.right.key > upper))
    return false;

  return validateSubTree(root.left, lower, root.key) && validateSubTree(root.right, root.key, upper);
}

function validateTree(root: Node) {
  const interval = 10e5;
  return validateSubTree(root, -interval, interval);
}


