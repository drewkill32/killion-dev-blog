import { toString } from "mdast-util-to-string";
import find from "unist-util-find";

export function addExcerpt() {
  return function (tree, file) {
    const firstP = find(tree, (node) => {
      return node.type === "paragraph";
    });
    const excerpt = toString(firstP);
    file.data.astro.frontmatter.excerpt = excerpt;
  };
}
