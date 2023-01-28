import { defineConfig } from "astro/config";
import { addExcerpt } from "./addExcerpt";
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  integrations: [
    mdx({
      remarkPlugins: [addExcerpt],
    }),
  ],
});
