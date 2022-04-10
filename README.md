# hexo-insert-markdown

A [Hexo](https://hexo.io/) plugin that allows you to insert Markdown files in existing Markdown files.

## Installation

1. Add this plugin to your Hexo site with `npm install hexo-insert-markdown --save`
2. Insert the `{% insertmd %}` tag in your posts or pages to include Markdown content from files
3. Rebuild your site to see the effect of this plugin: `hexo clean && hexo generate`

**Note:** The path to file includes must be relative to the [source directory](https://hexo.io/docs/configuration.html#Directory) of your Hexo installation.

## Usage

### Insert Markdown file

Open your Markdown file (a post or page) and include this custom tag:

```md
{% insertmd your/file.md %}
```

### Insert separator

If you want to specify a custom separator, that is rendered after each include, you can use:

```md
{% insertmd your/file.md '---' %}
```

### Insert Markdown files from directory

To include all top-level Markdown files from a directory insert:

```md
{% insertmd your/directory/with/includes '---' %}
```

### Insert TOC on top of includes

If you want to render a table of contents (TOC) on top of your includes, you have to supply an empty object (`{}`) as third parameter to `insertmd`:

```md
{% insertmd your/directory/with/includes '---' '{}' %}
```

All options from the [hexo-util tocObj](https://github.com/hexojs/hexo-util/tree/2.6.0#tocobjstr-options) are supported, so you can define the minimum and maximum level of TOC headings:

```md
{% insertmd error-ts/includes '---' '{ "max_depth": 2 }' %}
```

It works without using a separator too:

```md
{% insertmd error-ts/includes '{ "max_depth": 2 }' %}
```

**Note:** The TOC options must be valid JSON (curly braces around objects and double quotes around property names).

## FAQ

> What was your motivation?

This plugin was inspired by [hexo-include-markdown](https://github.com/tea3/hexo-include-markdown). It extends its functionality with syntax highlighting for [code blocks](https://hexo.io/docs/syntax-highlight.html#How-to-use-code-block-in-posts).

> Why is this plugin using tags (`{% ... %}`) instead of [helpers](https://hexo.io/docs/helpers) (`<%- ... %>`)?

Helpers cannot be used in source files ([source](https://github.com/hexojs/site/pull/118)) which is why this plugin uses tags.

> How can I embed code?

To include code (JavaScript, TypeScript, etc.) you can use Hexo's built-in [codeblock](https://hexo.io/docs/tag-plugins.html#Code-Block) or [include_code](https://hexo.io/docs/tag-plugins.html#Include-Code) syntax. It works like this:

```
{% include_code lang:javascript my-code.js %}
```

**Note:** Your code files must be stored in the `source/downloads/code` directory of your Hexo blog.
