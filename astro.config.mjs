import { defineConfig } from "astro/config";
import { addExcerpt } from "./addExcerpt";
import image from "@astrojs/image";
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  markdown: {
    extendDefaultPlugins: true,
    remarkPlugins: [addExcerpt]
  },
  integrations: [image(), mdx()]
});