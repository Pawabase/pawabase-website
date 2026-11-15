/**
 * What the blog adds to MDX, at build time, so posts stay plain Markdown:
 *
 *   - A relative image (`![alt](./assets/shot.png "caption")`, or `<Figure src="./assets/shot.png" />`) becomes an import of that
 *     file, optimised by vite-imagetools into AVIF, WebP and JPEG at several widths with a tiny blurred placeholder, and is drawn by
 *     the <Figure> component with its real width and height (no layout shift), lazy loading, a caption and a zoom view. A picture
 *     on its own line is a full figure; one inside a sentence stays inline.
 *   - The frontmatter's `cover` is imported the same way and exported as `cover`.
 *   - Headings are numbered the way rehype-slug numbers them, and the h2s and h3s are exported as `toc`.
 *   - A code fence's title and highlighted lines (```ts title="client.ts" {3,5-7}) reach the <pre> as data attributes.
 */
import GithubSlugger from "github-slugger";
import { Parser } from "acorn";
import { toString } from "mdast-util-to-string";
import { visit, SKIP } from "unist-util-visit";
import { parse as parseYaml } from "yaml";

const program = (code) => Parser.parse(code, { ecmaVersion: "latest", sourceType: "module" });
const esm = (code) => ({ type: "mdxjsEsm", value: code, data: { estree: program(code) } });
const expression = (code) => ({ type: "mdxJsxAttributeValueExpression", value: code, data: { estree: program(code) } });
const attr = (name, value) => ({ type: "mdxJsxAttribute", name, value });

/** A file next to the post, not an address on the web or the site. */
const local = (url) => typeof url === "string" && url !== "" && !/^(?:[a-z][a-z0-9+.-]*:|\/\/|\/|#)/i.test(url);
const RASTER = /\.(png|jpe?g|webp|avif|tiff?)$/i;

export default function remarkBlog() {
  return (tree) => {
    const imports = [];
    let count = 0;

    /** Import an image; returns the attributes a <Figure> needs for it. */
    const load = (url) => {
      const path = url.startsWith(".") ? url : `./${url}`;
      const id = `__blogImage${count++}`;
      if (RASTER.test(path)) {
        imports.push(`import ${id} from ${JSON.stringify(`${path}?blog`)};`, `import ${id}Blur from ${JSON.stringify(`${path}?lqip`)};`);
        return [attr("image", expression(id)), attr("lqip", expression(`${id}Blur`))];
      }
      // GIF, SVG and the rest are served as they are
      imports.push(`import ${id} from ${JSON.stringify(`${path}?url`)};`);
      return [attr("src", expression(id))];
    };

    const figure = (node, flow) => ({
      type: flow ? "mdxJsxFlowElement" : "mdxJsxTextElement",
      name: "Figure",
      attributes: [...load(node.url), attr("alt", node.alt ?? ""), ...(node.title ? [attr("caption", node.title)] : []), ...(flow ? [] : [attr("inline", null)])],
      children: [],
    });

    // a paragraph that is only a picture is a figure; a picture inside text stays in the text
    visit(tree, "paragraph", (node, index, parent) => {
      const kids = node.children.filter((c) => !(c.type === "text" && !c.value.trim()));
      if (kids.length === 1 && kids[0].type === "image" && local(kids[0].url) && parent && index !== undefined) {
        parent.children[index] = figure(kids[0], true);
        return SKIP;
      }
    });
    visit(tree, "image", (node, index, parent) => {
      if (local(node.url) && parent && index !== undefined) parent.children[index] = figure(node, false);
    });

    // <Figure src="./assets/x.png" /> written as JSX
    visit(tree, ["mdxJsxFlowElement", "mdxJsxTextElement"], (node) => {
      if (node.name !== "Figure" && node.name !== "Image") return;
      const src = node.attributes.find((a) => a.type === "mdxJsxAttribute" && a.name === "src");
      if (!src || typeof src.value !== "string" || !local(src.value)) return;
      node.name = "Figure";
      node.attributes = [...node.attributes.filter((a) => a !== src), ...load(src.value)];
    });

    // the cover, from the frontmatter
    let cover = "null";
    const yaml = tree.children.find((n) => n.type === "yaml");
    if (yaml) {
      const data = parseYaml(yaml.value) ?? {};
      if (data.cover && local(data.cover)) {
        const [image, blur] = load(data.cover);
        cover = `{ image: ${image.value.value}, lqip: ${blur ? blur.value.value : "null"}, alt: ${JSON.stringify(String(data.coverAlt ?? ""))} }`;
      }
    }

    // headings: the same ids rehype-slug gives them, in the same order
    const slugger = new GithubSlugger();
    const toc = [];
    visit(tree, "heading", (node) => {
      const text = toString(node);
      const id = slugger.slug(text);
      if (node.depth === 2 || node.depth === 3) toc.push({ depth: node.depth, text, id });
    });

    // code fences: ```lang title="file.ts" {1,4-6}
    visit(tree, "code", (node) => {
      if (!node.meta) return;
      const title = node.meta.match(/title=(?:"([^"]*)"|'([^']*)'|(\S+))/);
      const lines = node.meta.match(/\{([\d,\s-]+)\}/);
      node.data ??= {};
      node.data.hProperties = {
        ...(node.data.hProperties ?? {}),
        ...(title ? { "data-title": title[1] ?? title[2] ?? title[3] } : {}),
        ...(lines ? { "data-lines": lines[1].replace(/\s+/g, "") } : {}),
      };
    });

    const at = yaml ? tree.children.indexOf(yaml) + 1 : 0;
    tree.children.splice(at, 0, ...[...imports, `export const cover = ${cover};`, `export const toc = ${JSON.stringify(toc)};`].map(esm));
  };
}
