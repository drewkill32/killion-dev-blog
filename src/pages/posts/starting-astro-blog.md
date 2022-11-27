---
layout: "../../layouts/MarkdownPostLayout.astro"
title: "Starting Astro Blog"
pubDate: 2022-11-24
author: "Drew Killion"
image:
  url: "/img/starting-astro-blog.jpg"
  alt: "road heading to the mountains"
tags: ["astro", "blogging", "figma"]
---

# Starting a new Astro Blog

So I just finished the [Astro build your first blog tutorial](https://docs.astro.build/en/tutorial/0-introduction/) and decided that like Astro as a blogging platform. It serves many of my needs:

- Static Site Generated
- Markdown based blog posts
- Amazing dev tools
- full customizability

After finishing the tutorial the look of the website is lacking.....

![Starting site](/img/StartingBlog.png)

Which means I need to design the site from scratch. There is a huge list of changes that I want make to the site, many of which will not be done by the time this post is up, but since it is a new site I doubt anyone will read it. The not complete list includes:

- Change design and layout
- Add comments
- Add Google Analytics
- Dark mode
- Add hosting and a proper domain name
- Add a table of contents for each blog post

## Change design and layout

I want to spend some designing before I build the website. To do that I'm going to use [Figma](https://www.figma.com/), Figma is a great tool for designers and the free tier has all the features I need.

![Mobile Moodboard](/img/MobileMoodboard.png)

First I start off by creating a mood board where I ~~steal~~ become inspired by other tech blogs. I found a bunch of blogs and took screenshots. I made sure to use the mobile view of their site. I want to make by site responsive so I'm thinking about mobile first. I realized that I like the more minimalist styles. I like [Marius Schulz's Blog](https://mariusschulz.com/blog), at least the header part. I think want the body to look similar to [Learn with Jason](https://www.learnwithjason.dev/blog) where there is an excerpt and a Read More link. I like the colors of Learn with Jason and [Coder's Block](https://codersblock.com/blog/). After playing around in Figma my first mockup looks like this:

![First Mock up](/img/BlogDesign.png)

For now I'm going to start with only CSS. Over time I may move to a Tailwind, but for now I want to stick to just CSS using the scoped CSS provided by Astro.

## Excerpts

For my design I want to create excerpts of the posts to be used on the main page. There doesn't seem to be a way to extract just part of post and use it an excerpt easily. A few options I looked into:

1. Duplicate the first paragraph and use it as a frontmatter property.
2. Read the whole contents of each file in insert it into the index page
3. Write a custom [markdown plugin](https://docs.astro.build/en/guides/markdown-content/#markdown-plugins) for Astro and parse the markdown during the build.

Number three seems like I would have to most control of the markdown. My plan is to write a Remark plugin that looks at markdown and extract the first paragraph. After looking at the documentation for a little bit I found the functions that I need to extract the excerpt.

```javascript
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
```

This function could be improved to grab other elements as well as paragraphs but for now this will work

## Summary

After working more on Astro I like the blogging platform, but I may end up moving the blogging content into a headless CMS like [Sanity](https://www.sanity.io/).
